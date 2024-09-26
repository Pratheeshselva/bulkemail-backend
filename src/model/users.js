import mongoose from './index.js';
import { generateuuid } from '../utils/Helper.js'
import validator from '../utils/validator.js';


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: function () {
            return generateuuid()
        }
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: validator.validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('users', userSchema)
export default userModel
