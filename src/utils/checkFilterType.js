import path from 'path'

function checkFilterType(file, cb) {
    const filetypes = /jpeg|jpg|png|mp4|pdf|csv/
    const extensionname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extensionname) {
        return cb(null, true)
    }
    else {
        cb('Error: Invalid File type')
    }
}

export default checkFilterType