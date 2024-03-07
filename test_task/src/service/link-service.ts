import 'dotenv/config'
import LinkModel from '../models/link-model'
import ApiError from '../exceptions/api-error'
import linkDto from '../dto/link-dto'
import LinkDto from '../dto/link-dto'
import linkModel from '../models/link-model'

class LinkService {
    generateRandomString(length: number): string {
        let result = ''
        const characters =
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    }

    async cutLink(link: string, userId: string) {
        const check = await LinkModel.findOne({ link })

        if (check) {
            throw ApiError.BadRequest('ССылка уже создана')
        }

        const idSize = 5
        const id = this.generateRandomString(idSize)

        const newLink = await LinkModel.create({
            link: link,
            shortLink: id,
            user: userId
        })

        return new linkDto(newLink)
    }

    async getLinks(userId: string) {
        const links = await LinkModel.find({ userId })
        const linksDto = links.map((link) => {
            return new linkDto(link)
        })
        return linksDto
    }

    async getLink(shortLink: string) {
        const linkData = await LinkModel.findOne({ shortLink })
        if (!linkData) {
            throw ApiError.BadRequest('Ссылка не создана')
        }
        const linkDataDto = new LinkDto(linkData)
        return linkDataDto
    }
}

export default new LinkService()
