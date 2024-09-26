import auth from '../utils/auth.js'
import usersModel from '../model/users.js'


const createUser = async (req, res) => {
    try {

        let user = await usersModel.findOne({ email: req.body.email })
        if (!user) {
            //hash the password
            if (req.body.password) {
                req.body.password = await auth.hashData(req.body.password)
                await usersModel.create(req.body)
                res.status(200).send({ message: "User created Successfully" })
            }

            else {
                return res.status(400).send({ message: "Password is required" })
            }


        }
        else {
            res.status(400).send({ message: `User with ${req.body.email} already exists` })
        }

    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}

const getAllUser = async (req, res) => {
    try {
        let user = await usersModel.find({}, { password: 0 })
        res.status(200).send({
            message: "User Data fetch successfull",
            data: user
        })

    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await usersModel.findOne({ email: email })
        if (user) {
            //check password accuracy
            if (await auth.compareHash(user.password, password)) {
                const token = await auth.createToken({
                    email: user.email,
                    name: user.name,
                    id: user.id,
                    role: user.role
                })

                res.status(200).send({
                    message: "Login Successfull",
                    token,
                    id: user.id,
                    notify: true,
                    role: user.role
                })
            }
            else {
                res.status(400).send({
                    message: "Incorrect Password"
                })
            }
        }



        else {
            res.status(400).send({
                message: `User with email ${req.body.email} does not exists`
            })
        }

    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}

const changepassword = async (req, res) => {
    try {
        let { userId } = req.headers
        let { newpassword, oldpassword } = req.body
        let user = await usersModel.findOne({ id: userId })
        if (user) {
            const isOldPasswordCorrect = await auth.compareHash(user.password, oldpassword)
            if (isOldPasswordCorrect) {
                const isNewPasswordSameAsOld = await auth.compareHash(user.password, newpassword)
                if (!isNewPasswordSameAsOld) {
                    user.password = await auth.hashData(newpassword)
                    await user.save()
                    res.status(200).send({
                        message: "Password Updated Successfully"
                    })
                }
                else {
                    res.status(400).send({ message: "New password should be different from old password" })
                }
            }
            else {
                res.status(400).send({ message: "Password did not match" })
            }

        }

        else {
            res.status(400).send({
                message: `User does not exists`
            })
        }

    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}




export default { createUser, getAllUser, login, changepassword }