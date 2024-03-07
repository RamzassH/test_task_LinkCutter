import { model, Schema } from 'mongoose'
import userModel, { IUser } from '../models/user-model'

class UserDto {
    email: string
    id: Schema.Types.ObjectId
    isActivated: boolean
    constructor(model: IUser) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
    }
}
export default UserDto
