// VARIABLES
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import User from '../../models/user.model.js'
import RegCode from '../../models/regCode.model.js'
import { signAccessToken, signRefreshToken } from '../../utils/jwt.js'


const registerUser = async (req, res) => {
  // Get the name, email, password, token, id and referLimit from the user
  const { name, email, password, token, id, referLimit } = req.body

  // For holding the errors present in the form after error check
  let errors = []

  // If a token is not provided by the user(user generated a registration link)
  if (!token && !(id && referLimit)) return res.status(404).json({ error: 'No token or invite link found!' })

  try {
    // Verify the invite link if the user is registering with an invite link
    if (id && referLimit) {
      // Check if the id is a valid type
      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(403).json({ error: 'Forbidden token!' })
  
      // Check if the user exists
      const findUser = await User.findById(id)
      if (!findUser) return res.status(404).json({ error: 'Link does not match' })
  
      // Get the referLimit of the inviteLink of the user with the id and check if it matches the referLimit from the client
      const limit = findUser.inviteLink.split('?')[1].split('&')[1].split('=')[1]
  
      if (limit !== referLimit) return res.status(403).json({ error: 'Link does not match' })

      if (limit == 0) {
        // Update the user inviteLink to be ''
        const deleteLink = await findUser.updateOne({ inviteLink: '' })
        if (!deleteLink) return res.status(500).json({ error: 'Something went wrong. Try again' })

        return res.status(401).json({ error: 'Invitation link has expired' })
      }
    }
    
    if (token) {
      // Check if the token exists in the database
      const findToken = await RegCode.findOne({ checkCode: token })
  
      // Send an error message if the user's token does not exist in the database
      if (!findToken) return res.status(403).json({ error: 'Invalid token!' })
      
      // Send an error message if the user's token has expired
      if (Date.now() - findToken.codeExpiry >= 300000){
        const deleteExpToken = await RegCode.findOneAndRemove({ checkCode: findToken.checkCode })
        if (!deleteExpToken) return res.status(500).json({ error: 'Something went wrong. Try again!' })
  
        return res.status(404).json({ error: 'Token has expired' })
      }
    }
  
    if (!email || !name || !password) { // Check if there are empty fields in the form
      errors.push({ error: 'Empty field(s) available' })
    }
  
    if (email) {
      // Check if the email is a valid one
      const atpos = email.indexOf('@')
      const dotpos = email.lastIndexOf('.')
      const mailType = 'gmail'
  
      if (atpos === -1 || dotpos === -1 || atpos > dotpos || email.indexOf(mailType) === -1 || email.indexOf(mailType) < atpos || email.indexOf(mailType) > dotpos) {
        errors.push({error: 'Invalid email' })
      }
    }
  
    // Check if there were any errors during error-check
    if (errors.length > 0) return res.status(400).json(errors)
    
    const mailCheck = await User.findOne({ email })
    // Send an error message if the user's email already exists in the database
    if (mailCheck) return res.status(400).json({ error: 'Email already exists' })

    const nameCheck = await User.findOne({ name })
    // Send an error message if the user's name already exists in the database
    if (nameCheck) return res.status(400).json({ error: 'Username already exists' })

    const userRole = 'user' // Set the user's role to 'user'

    // Generate a salt to generate hash
    const salt = await bcrypt.genSalt(10)
    if (!salt) return res.status(500).json({ error: "Something went wrong. Please try again!" })
  
    // Generate a hash using the user's password and the generated salt
    const hash = await bcrypt.hash(password, salt)
    if (!hash) return res.status(500).json({ error: "Something went wrong. Please try again!" })
    
    const newUser = new User({
      name,
      email,
      password: hash,
      role: userRole
    })

    // Save the user to the database
    const saveUser = await newUser.save()
    if (!saveUser) return res.status(500).json({ error: 'Something went wrong. Try again!' })

    const user = {
      id: saveUser._id
    }

    // Generating JWT Tokens
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    // Reduce the number of referLimit in the invitation link if there is any
    if (id && referLimit) {
      const limit = parseInt(referLimit) - 1
      const newInvLink = `${process.env.HOST_NAME}/sugar/baby/signup?id=${id}&rL=${limit}`
  
      const updateInviter = await User.findByIdAndUpdate(id, { inviteLink: newInvLink })
      if (!updateInviter) return res.status(500).json({ error: 'Something went wrong. Try again!' })
    }

    if (token) {
      const deleteToken = await RegCode.findOneAndRemove({ checkCode: token })
      if (!deleteToken) return res.status(500).json({ error: 'Something went wrong. Try again!' })
    }


    // Response on success
    return res.status(201).json({ accessToken, refreshToken })
  } 
  catch (err) {
    return res.status(400).json(err.message)
  }
}


export default registerUser
