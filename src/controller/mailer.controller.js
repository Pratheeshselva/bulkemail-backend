import nodemailer from 'nodemailer'
import templateModel from '../model/templates.js'
import senderAddressModel from '../model/senderAddress.js'
import auth from '../utils/auth.js'
import clearUploads from '../middleware/clearUploads.js'
import path from 'path'







const sendMail = async (req, res,) => {


  try {


    const { user, templatename, from, username, password, cc, bcc, body, subject, to, html } = req.body
    if (!to) {
      return res.status(400).send({ message: "Recipient email is required" });
    }
    if (!templatename) {
      return res.status(400).send({ message: "Template name is required" });
    }
    if (!from) {
      return res.status(400).send({ message: "Sender email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!username) {
      return res.status(400).send({ message: "Sender's name is required" });
    }
    const template = await templateModel.findOne({ templatename })
    if (!template) {
      return res.status(400).send({ message: "Template not found" })
    }
    const isUserexist = await senderAddressModel.findOne({ user: from })


    if (isUserexist) {
      const hashpassword = isUserexist.password
      const isPasswordValid = await auth.compareHash(hashpassword, password)
      if (!isPasswordValid) {
        return res.status(400).send({ message: "Incorrect password" })
      }

    }
    else {
      return res.status(400).send({ message: "No such User Found" })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: from,
        pass: password
      }
    })
    const mailOptions = {
      from: `${username} ${from}`,
      to: to,
      cc: cc ? cc : '',
      bcc: bcc ? bcc : '',
      subject: subject,
      text: body,
      html: html ? html : '',
      attachments: req.file ? [{ filename: req.file.originalname, path: path.join('fileuploads', req.file.filename) }] : []
    }


    await transporter.sendMail(mailOptions)
    console.log("Mail sent is success")
    res.status(200).send({ message: 'Mail has been sent successfully' })


    setTimeout(() => {
      clearUploads()
    }, 10000);

  } catch (error) {
    console.log(`Error in ${req.OriginalUrl}`, error.message)
    res.status(500).send({ message: error.message || "Internal server Error" })
  }

}


export default { sendMail }
