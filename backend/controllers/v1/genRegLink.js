// VARIABLES
import Randomstring from 'randomstring'
import nodemailer from 'nodemailer'

import RegCode from '../../models/regCode.model.js'


const generateRegistrationLink = async (req, res) => {
  const { email } = req.body

  // For holding the errors present in the form after error check
  let errors = []

  // Check if the email field is empty
  if (!email) {
    errors.push({ error: 'Empty fields' })
  }
  
  // Check if the email is a valid one
  if (email) {
    const atpos = email.indexOf('@')
    const dotpos = email.lastIndexOf('.')
    const emailType = 'gmail'
  
    if (atpos > dotpos || atpos === -1 || dotpos === -1 || !email.includes(emailType) || email.indexOf(emailType) < atpos || email.indexOf(emailType) > dotpos){
      errors.push({ error: 'Invalid email' })
    }
  }

  // Check if there are errors in the form
  if (errors.length > 0) return res.status(400).json(errors)

  try {
    // Generate registration token
    let regCodeGen = Randomstring.generate()
  
    // Check if the generated already exists in the database
    const genCode = await RegCode.findOne({ checkCode: regCodeGen })
    if (genCode) return res.status(500).json({ error: 'Something went wrong. Try again!' })
  
    let codeExpiryDate = Date.now() + 300000 // Set the expiry date to 5 minutes after generating it
  
    // Create a new token to be saved using the generated token and expiryDate
    const newRegCode = new RegCode({
      checkCode: regCodeGen,
      codeExpiry: codeExpiryDate
    })
  
    // Nodemailer smtp transport service
    const transporter = nodemailer.createTransport({
      // service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.mailAccount,
        pass: process.env.mailPass
      }
    })
  
    // Informations in the registration email to be sent to the user
    const regLink = `${process.env.HOST_NAME}/sugar/baby/signup?token=${regCodeGen}`
    const mailOptions = {
      from: 'innvesio',
      to: email,
      subject: 'Email Registration Link',
      html: `<b>Click the link to create you innvesio account. <a href="${regLink}">Go to innvesio</a></b>`
    }
  
    // Save the token and expiry to the database
    const saveCode = await newRegCode.save()
    if (!saveCode) return res.status(500).json({ error: 'Something went wrong. Try again!' })

    // Send email after token has been save to the database
    const sendEmail = await transporter.sendMail(mailOptions)
    if (!sendEmail) return res.status(500).json({ error: 'Something went wrong. Try again!' })

    console.log('Mail sent' + sendMail.response)
    res.status(201).json({ success: 'Email sent to the user' }) // Send response to the client-side

  } catch (err) {
    throw err.message // throws an error message if any
  }
}

export default generateRegistrationLink