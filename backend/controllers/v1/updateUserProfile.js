// VARIABLES
import sharp from "sharp"
import fs from 'fs'

import User from "../../models/user.model.js"

const updateUserProfile = async (req, res) => {
  // Get the user's id, bio, website, instagramHandle, twitterHandle and profile image url sent from the client
  const { name, bio, website, twitter, instagram, bankCode,
    bankName,
    accountName,
    subaccountCode,
    accountNumber } = req.body
  
  const allowedExt = ['image/jpeg', 'image/png']
  let profileImg = null

  if(!allowedExt.includes(req.file.mimetype)) return res.status(200).json({ error: 'Can only upload a jpeg or png file' })

  try {
    const filename = `${Date.now()}${Math.round(Math.random() * 1E9)}.webp`
  
    const info = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer()

    fs.writeFileSync(`${process.env.TP_NAME}/public/uploads/${filename}`, info, { encoding: 'utf-8' })
  
    profileImg = `${process.env.HOST_NAME}/public/uploads/${filename}`
  }
  catch (err) {
    throw err.message
  }

  if (profileImg === null) return res.status(500).json({error: 'Something went wrong. Try again!' })
  
  // CHeck if the user with the id collected from the client exists in the database
  const user = await User.findOne({ _id: req.user._id })

  // Send an error message if the user does not exist
  if (!user) return res.status(400).json({ error: 'User does not exist' })

  try {
    const updateInfo = {
      profileImage: profileImg,
      website,
      twitterHandle: twitter,
      instagramHandle: instagram,
      aboutMe: bio,
      name,
      bankCode,
      bankName,
      accountName,
      subaccountCode,
      accountNumber
    }
    
    // Update the user's info based on what the client provided
    const updateUser = await user.updateOne(updateInfo)
    if (!updateUser) return res.status(500).json({ error: 'Something went wrong. Please try again' })

    // Response on success
    res.status(201).json(updateInfo)
  }
  catch(err) {
    throw err.message
  }
}

export default updateUserProfile
