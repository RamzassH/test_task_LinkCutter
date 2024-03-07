import ApiError from '../exceptions/api-error'
import express, { Request, Response, NextFunction } from 'express'
import tokenService from '../service/token-service'

declare module 'express-serve-static-core' {
    interface Request {
        user?: any
    }
}

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next(ApiError.UnauthorizedError())
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return next(ApiError.UnauthorizedError())
        }

        const data = tokenService.validateAccessToken(token)
        if (!data) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = data
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
