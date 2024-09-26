import mongoose from './index.js';
import validator from '../utils/validator.js';
import { generateuuid } from '../utils/Helper.js'


const senderAddressSchema = new mongoose.Schema({
    id: {
        type: String,
        default: function () {
            return generateuuid()
        }
    },

    user: {
        type: String,
        required: [true, "Senders email address is required"],
        validate: {
            validator: validator.validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('senderaddress', senderAddressSchema)
export default userModel
