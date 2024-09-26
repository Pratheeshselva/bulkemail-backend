import senderAddressModel from '../model/senderAddress.js'
import auth from '../utils/auth.js'


const saveSenderAddress = async (req, res) => {

    try {
        const { user, password } = req.body

        if (user && password) {
            let userCheck = await senderAddressModel.findOne({ user: user })
            if (!userCheck) {
                const password = await auth.hashData(req.body.password)
                await senderAddressModel.create({ user, password })
                res.status(200).send({ message: "Sender email and password saved successfully" })
            }
            else {
                res.status(400).send({ message: `sender email ${user} already exists` })
            }

        }
        else {
            res.status(400).send({ message: 'Please check your sender email address and password' })
        }
    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}

const getAllSenderAddress = async (req, res) => {
    try {
        let user = await senderAddressModel.find({}, { password: 0 })
        res.status(200).send({
            message: "User Data fetch successfull",
            data: user
        })

    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}

const deleteSendersAddress = async (req, res) => {
    try {
        const { id } = req.params
        const user = await senderAddressModel.findOne({ id: id })

        if (user) {
            await senderAddressModel.deleteOne({ id: id })
            res.status(200).send({ message: "Sender details deleted successfully" })
        }
        else {
            console.log("else block is called")
            res.status(400).send({ message: "No such user found" })
        }


    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}



export default { saveSenderAddress, getAllSenderAddress, deleteSendersAddress }