import express from 'express'
import senderRoutes from '../controller/sendersAddresss.controller.js'
import verifyAuth from '../middleware/verifyAuth.js'

const router = express.Router()

router.get('/getallsendersaddress', verifyAuth,senderRoutes.getAllSenderAddress)
router.post('/saveAddress', verifyAuth,senderRoutes.saveSenderAddress)
router.delete('/deleteSendersAddress/:id',verifyAuth,senderRoutes.deleteSendersAddress)


export default router