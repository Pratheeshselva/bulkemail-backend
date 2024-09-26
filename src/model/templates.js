import mongoose from "mongoose";
import { generateuuid } from '../utils/Helper.js'

const templateSchema = new mongoose.Schema({
    id: {
        type: String,
        default: function () {
            return generateuuid()
        }
    },
    templatename: {
        type: String,
        required: [true, "Template name is required"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
    },
    body: {
        type: String
    },
    htmlbody: {
        type: String
    },
    bcc: {
        type: String
    },
    cc: {
        type: String
    },

    to: {
        type: String
    },
    username: {
        type: String
    },
    html: {
        type: String
    }


}, {
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('templates', templateSchema)
export default userModel
