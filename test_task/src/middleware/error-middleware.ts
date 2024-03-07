import express, {
    Request,
    Response,
    ErrorRequestHandler,
    NextFunction
} from 'express'
import ApiError from '../exceptions/api-error'

export function errorMiddleware(
    err: ErrorRequestHandler | typeof ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err)
    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors })
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка.' })
}
