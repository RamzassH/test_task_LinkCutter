import jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model'
import { Schema } from 'mongoose'
import { Tokens } from '../types/tokenTypes'
import UserDto from '../dto/user-dto'
import 'dotenv/config'

class TokenService {
    generateTokens(payload: string | UserDto): Tokens {
        const accessToken: string = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: '60m' }
        )

        const refreshToken: string = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY_REFRESH as string,
            { expiresIn: '30d' }
        )

        return { accessToken, refreshToken }
    }

    async saveToken(userId: Schema.Types.ObjectId, refreshToken: string) {
        const tokenData = await tokenModel.findOne({ user: userId })

        console.log(tokenData)
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        return await tokenModel.create({
            user: userId,
            refreshToken: refreshToken
        })
    }

    async removeToken(token: string) {
        const tokenData = await tokenModel.deleteOne({ token })
        return tokenData
    }

    async findToken(token: string) {
        const tokenData = await tokenModel.findOne({ token })
        return tokenData
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY as string
            )
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const data = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY_REFRESH as string
            )
            return data
        } catch (e) {
            return null
        }
    }
}

export default new TokenService()
