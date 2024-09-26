import bcrypt from 'bcryptjs'
import config from './config.js'
import jwt from 'jsonwebtoken'


//hashingthedata( use to hash password and store it in DB)
const hashData = async (string) => {
    let salt = await bcrypt.genSalt(config.SALT)
    let hash = await bcrypt.hash(string, salt)
    return hash
}

//TO compare the hash and string the user sends
const compareHash = async (hash, string) => {
    return await bcrypt.compare(string, hash)
}


//Creating token (After confirming that the password is correct while signing In)
const createToken = async (payload) => {
    let token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRY
    })
    return token
    //Now user has a token after signing In
}

//decodetokent to see all info from the token
const decondeToken = (token) => {
    return jwt.decode(token)
}


export default {
    hashData, compareHash, createToken, decondeToken
}