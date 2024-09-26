import express from 'express'
import userRoutes from './users.js'
import mailRoutes from './mailer.js'
import templateRoutes from './templates.js'
import SenderRoutes from './sendersAddress.js'


const router = express.Router()

router.use('/user', userRoutes)
router.use('/mail', mailRoutes)
router.use('/address', SenderRoutes)
router.use('/template',templateRoutes)
router.get('*', (req,res)=>res.send(`<div>The requested end point does not exist</div>`))



export default router