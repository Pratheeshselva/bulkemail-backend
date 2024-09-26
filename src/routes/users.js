import express from 'express'
import usersController from '../controller/users.controller.js'
import verifyAuth from '../middleware/verifyAuth.js'

const router = express.Router()

router.get('/getalluser',verifyAuth, usersController.getAllUser)
router.post('/createuser', usersController.createUser)
router.post('/login', usersController.login)
router.put('/changepassword', verifyAuth,usersController.changepassword )



export default router