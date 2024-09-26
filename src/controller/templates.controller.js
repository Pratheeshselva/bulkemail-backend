import templateModel from '../model/templates.js'


const saveTemplate = async (req, res) => {
    try {
        const { body, templatename, subject, id } = req.body
        if (templatename) {
            let dupCheck = await templateModel.findOne({ templatename: templatename })
            if (!dupCheck) {
                await templateModel.create(req.body)
                res.status(200).send({ message: "Mail template saved successfully" })
            }
            else {
                res.status(400).send({ message: "Template name already exists, try a different one" })
            }
        }
        else {
            res.status(400).send({ message: "Please provide a template name" })
        }


    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}

const editTemplate = async (req, res) => {
    try {
        const { templatename, subject, body, bcc, cc, id, username, html } = req.body
        let findtemplateid = await templateModel.findOne({ id: id })
        if (findtemplateid) {
            if (templatename) {
                findtemplateid.templatename = templatename
            }
            if (subject !== undefined) {
                findtemplateid.subject = subject
            }
            if (body !== undefined) {
                findtemplateid.body = body
            }
            if (bcc !== undefined) {
                findtemplateid.bcc = bcc
            }
            if (cc !== undefined) {
                findtemplateid.cc = cc
            }
            if (username !== undefined) {
                findtemplateid.username = username
            }
            if (html !== undefined) {
                findtemplateid.html = html
            }

            await findtemplateid.save()
            res.status(200).send({ message: "Template updated & saved successfully" })

        }
        else {
            res.status(400).send({ message: "No such template exists" })
        }


    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}

const DeleteTemplate = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const deletetemplate = await templateModel.findOneAndDelete({ id: id })
            if (deletetemplate) {
                res.status(200).send({ message: "Template Deleted successfully" })
            }
            else {
                res.status(400).send({ message: "No such template name exists" })
            }
        }
        else {
            res.status(400).send({ message: "Please provide the template name to delete" })
        }
    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}

const getAllTemplate = async (req, res) => {
    try {
        const templates = await templateModel.find({})
        res.status(200).send({
            message: "Templates fetch successfull",
            templates
        })

    } catch (error) {
        console.log(`Error in ${req.OriginalUrl}`, error.message)
        res.status(500).send({ message: error.message || "Internal server Error" })
    }
}


export default { saveTemplate, editTemplate, DeleteTemplate, getAllTemplate }