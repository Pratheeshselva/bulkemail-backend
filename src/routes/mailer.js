import express from 'express'
import verifyAuth from '../middleware/verifyAuth.js'
import mailController from '../controller/mailer.controller.js'
import uploadMiddleWare from '../middleware/multer.js'


const router = express.Router()

router.post('/sendemail',verifyAuth, uploadMiddleWare ,mailController.sendMail)


export default router