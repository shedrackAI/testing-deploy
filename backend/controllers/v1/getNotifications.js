// VARIABLES
import Notification from "../../models/notification.model.js"
import User from "../../models/user.model.js"

const getUserNotifications = async (req, res) => {
  const  { user_id } = req.body;

  // Check if userId exists in the database
  const findUser = await User.findOne({ user_id })
  
  if (!findUser) {
    // Send an error message if userId doesn't exist
    res.status(400).json({ error: 'User does not exist' })
    return
  }
  else {
    // Get the user's notifications
    const userReceivedNotifications = await Notification.find({ user_id: user_id })

    if (!userReceivedNotifications) {
      // Send a 'no notification' message to the client if the user has no notification
      res.status(400).json({ msg: 'No notification for this user' })
      return
    }
    else {
      // Response on success
      res.status(200).json(userReceivedNotifications)
    }
  }
}

export default getUserNotifications
