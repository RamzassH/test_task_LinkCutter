import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './router'
import { errorMiddleware } from './middleware/error-middleware'
import 'dotenv/config'

const app: Express = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONT_URL
    })
)
app.use('/api', router)
app.use(errorMiddleware)

mongoose
    .connect('mongodb://localhost/test-task')
    .then(() => console.log('DB has started'))
    .catch((e) => console.log(e))
dotenv.config()

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
