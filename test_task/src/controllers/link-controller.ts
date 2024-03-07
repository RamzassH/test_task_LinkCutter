import express, { Request, Response, NextFunction } from 'express'
import LinkService from '../service/link-service'
import tokenService from '../service/token-service'
import ApiError from '../exceptions/api-error'

class LinkController {
    async cutLink(req: Request, res: Response, next: NextFunction) {
        try {
            const { link } = req.body
            const { userId } = req.user.id
            const linkData = await LinkService.cutLink(link, userId)

            return res.json(linkData)
        } catch (e) {
            next(e)
        }
    }

    async getLinks(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.user.id
            const links = await LinkService.getLinks(userId)
            return res.json(links)
        } catch (e) {
            next(e)
        }
    }

    async getLink(req: Request, res: Response, next: NextFunction) {
        try {
            const link: string = req.params.link
            const linkData = await LinkService.getLink(link)
            return res.redirect(linkData.link)
        } catch (e) {
            next(e)
        }
    }
}
export default new LinkController()
