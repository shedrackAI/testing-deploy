// VARIABLES
import express from 'express'

import { verifyAccessToken } from '../../utils/jwt.js'
import uploadImage from '../../utils/uploadImage.js'

import generateRegistrationLink from '../../controllers/v1/genRegLink.js'
import registerUser from '../../controllers/v1/registerUser.js'
import loginUser from '../../controllers/v1/loginUser.js'
import createInviteLink from '../../controllers/v1/createInvLink.js'
import supportFriend from '../../controllers/v1/supportfriend.js'

import findUser from '../../controllers/v1/findUser.js'
import getUserNotifications from '../../controllers/v1/getNotifications.js'
import updateUserProfile from '../../controllers/v1/updateUserProfile.js'

const router = express.Router()

// @Desc    Endpoint for generating registration links
router.post('/u/codegen/signup', generateRegistrationLink)


// @Desc    User registration endpoint
router.post('/u/signup', registerUser)


// @Desc    User authentication endpoint
router.post('/u/login', loginUser)


// @Desc    Endpoint for handling generation of invite links
router.post('/u/codegen/refer', createInviteLink)

// @Desc    Endpoint for finding users via id or email
router.post('/u/find/user', findUser)

// @Desc  Handle friend support system with notifications
router.post('/u/friend/support', verifyAccessToken, supportFriend)


// @Desc  Handle notifications for users
router.post('/u/get/notifications', verifyAccessToken, getUserNotifications)


// @Desc  Update user's profile
router.post('/u/profile/update', verifyAccessToken, uploadImage.single('profileImg'), updateUserProfile)


// Get all the users in fund-afriend
router.get('/u/users/all', verifyAccessToken, (req, res) => {
  const getAllUsers = User.find({})
  if (getAllUsers) {
    res.status(200).json(result)
    return
  }
  else {
    res.status(400).json({ error: 'No user found' })
  }
})

export default router
