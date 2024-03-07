import express, { NextFunction, Request, Response } from 'express'
import userService from '../service/user-service'
import UserService from '../service/user-service'
import { validationResult } from 'express-validator'
import ApiError from '../exceptions/api-error'
import 'dotenv/config'

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка валидации', errors.array())
                )
            }

            const { name, email, password } = req.body
            const userData = await UserService.registration(
                name,
                email,
                password
            )
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 120 * 1000,
                httpOnly: true
            })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const userData = await UserService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 120 * 1000,
                httpOnly: true
            })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 120 * 1000,
                httpOnly: true
            })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const link: string = req.params.link
            await userService.activate(link)
            return res.redirect(process.env.FRONT_URL as string)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()
