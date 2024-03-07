import mongoose, { Document, Schema } from 'mongoose'

export interface ILink extends Document {
    link: string
    shortLink: string
    user: Schema.Types.ObjectId
}

const LinkSchema: Schema = new Schema({
    link: { type: String, required: true },
    shortLink: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model<ILink>('Link', LinkSchema)
