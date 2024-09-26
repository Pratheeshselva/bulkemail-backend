
import path from 'path'
import fs from 'fs'



const directory = path.join(process.cwd(), 'fileuploads')

const clearUploads = () => {
    fs.readdir(directory, (err, files) => {
        if (err)
            return console.error(err)
        files.forEach(file => {
            fs.unlink(path.join(directory, file), err => {
                if (err)
                    console.error(`Failed to delete ${file}: ${err}`)
            })
        })
    })
}

export default clearUploads