import userModel, { IUser } from '../models/user-model'
import bcrypt from 'bcrypt'
import { v4 as uuid4 } from 'uuid'
import tokenService from './token-service'
import mailService from './mail-service'
import { Tokens } from '../types/tokenTypes'
import UserDto from '../dto/user-dto'
import apiError from '../exceptions/api-error'
import ApiError from '../exceptions/api-error'
import { JwtPayload } from 'jsonwebtoken'

class UserService {
    async getTokensAndDTO(user: IUser) {
        const userDTO: UserDto = new UserDto(user)
        const tokens: Tokens = tokenService.generateTokens({ ...userDTO })
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)
        return { ...tokens, user: userDTO }
    }
    async registration(name: string, email: string, password: string) {
        const check = await userModel.findOne({ email })
        if (check) {
            throw apiError.BadRequest('Пользователь с таким email уже создан')
        }
        const salt = 5
        const hashPassword = await bcrypt.hash(password, salt)

        const activationLink = uuid4()
        const newUser = await userModel.create({
            email: email,
            name: name,
            password: hashPassword,
            activationLink: activationLink
        })

        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL as string}/api/activate/${activationLink}`
        )

        return await this.getTokensAndDTO(newUser)
    }

    async login(email: string, password: string) {
        const userToCheck = await userModel.findOne({ email })
        if (!userToCheck) {
            throw ApiError.BadRequest(
                'Пользователь с данным email не зарегестрирован'
            )
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            userToCheck.password
        )
        if (!isPasswordCorrect) {
            throw ApiError.BadRequest('Неверный пароль')
        }

        return await this.getTokensAndDTO(userToCheck)
    }

    async logout(refreshToken: string) {
        const data = await tokenService.removeToken(refreshToken)
        return data
    }

    async activate(activationLink: string) {
        const user: IUser | null = await userModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest(`Пользователь не существует`)
        }
        user.isActivated = true
        await user.save()
    }

    async refresh(token: string) {
        if (!token) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(token) as JwtPayload

        const tokenFromDB = await tokenService.findToken(token)

        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await userModel.findById(userData.id)

        return await this.getTokensAndDTO(user!)
    }

    async getAllUsers() {
        const users = await userModel.find()
        return users
    }
}

export default new UserService()
