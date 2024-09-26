import multer from 'multer'
import checkFilterType from '../utils/checkFilterType.js'
import fs from 'fs'

const dir = './fileuploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})



const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFilterType(file, cb)
    }
})

const uploadMiddleWare = upload.single('attachments')

export default uploadMiddleWare