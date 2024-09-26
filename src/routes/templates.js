import express from 'express'
import templatesController from '../controller/templates.controller.js'
import verifyAuth from '../middleware/verifyAuth.js'

const router = express.Router()

router.get('/getalltemplate',verifyAuth, templatesController.getAllTemplate)
router.post('/savetemplate',verifyAuth, templatesController.saveTemplate)
router.put('/edittemplate',verifyAuth,templatesController.editTemplate)
router.delete('/deletetemplate/:id',verifyAuth,templatesController.DeleteTemplate)



export default router