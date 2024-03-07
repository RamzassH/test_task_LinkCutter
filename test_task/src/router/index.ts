import express, { Request, Response } from 'express'
import userController from '../controllers/user-controller'
import { body } from 'express-validator'
import authMiddleware from '../middleware/auth-middleware'
import linkController from '../controllers/link-controller'

const router = express.Router()

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 40 }),
    userController.registration
)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

router.post('/create', authMiddleware, linkController.cutLink)

router.get('/links', authMiddleware, linkController.getLinks)

router.get('/l/:link', linkController.getLink)

router.get('/activate/:link', userController.activate)

router.get('/refresh', userController.refresh)

router.get('/users', authMiddleware, userController.getUsers)

export default router
