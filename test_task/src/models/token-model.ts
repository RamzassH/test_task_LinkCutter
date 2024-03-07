import mongoose, { Document, Schema } from 'mongoose'

interface IToken extends Document {
    user: Schema.Types.ObjectId
    refreshToken: string
}

const TokenSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true }
})

export default mongoose.model<IToken>('Token', TokenSchema)
