// VARIABLES
import Notification from "../../models/notification.model.js"
import User from "../../models/user.model.js"

const createInviteLink = async (req, res) => {

  // Get the email and referLimit from the form sent by the admin
  const { email, referLimit } = req.body

  // For holding the errors present in the form after error check
  let errors = []

  if (!email || !referLimit) { // Check if there are empty fields in the form
    errors.push({ error: 'Empty field(s) available' })
  }

  if (typeof referLimit !== "number") { // Check if the value of 'referLimit' is not a number
    errors.push({ error: 'referLimit is not a number' })
  }

  if (errors.length > 0) return res.status(400).json(errors) // Check if there were any errors during error-check

  try {
    // Check if the user's email exists in the database
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ error: 'Email does not exist' })
  
    // Check if the user already has an referral link
    if (user.inviteLink !== "" || user.inviteLink !== null || user.inviteLink !== 'undefined') return res.status(400).json({ error: 'User already has an invite link' + user.inviteLink })
    
    // Get the user's id
    const userId = user._id
  
    // Create the format of the referral link
    const link = `${process.env.HOST_NAME}/sugar/baby/signup?id=${userId}&rL=${referLimit}`
  
    // update the user's inviteLink data
    const update = await user.updateOne({ inviteLink: link })
    if (!update) return res.status(500).json({ error: 'Something went wrong. Try again!' })
    
    // Create a new notification
    const userFrom = 'Fund-aFriend'
    const message = `${userFrom} has generated a referral link for you. You can now invite your friends to join!`
    const newNotification = new Notification({
      from: userFrom,
      to: user.email,
      message
    })

    const updateInfo = await newNotification.save()
    if(!updateInfo) return res.status(500).json({ error: 'Something went wrong. Try again!' })

    // Response on success
    res.status(201).json({ success: 'Invite link has been created' })
  } catch (err) {
    throw err.message
  }
}

export default createInviteLink