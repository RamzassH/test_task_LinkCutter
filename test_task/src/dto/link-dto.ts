import { model, Schema } from 'mongoose'
import linkModel, { ILink } from '../models/link-model'
class LinkDto {
    link: string
    shortLink: string
    id: Schema.Types.ObjectId
    constructor(model: ILink) {
        this.link = model.link
        this.id = model._id
        this.shortLink = model.shortLink
    }
}
export default LinkDto
