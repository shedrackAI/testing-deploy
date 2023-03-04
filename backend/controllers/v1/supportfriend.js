/*
* Need to apply the payStack feature in this section **
* OR create another route for support user with paystack feature
*/



// VARIABLES
// import mongoose from "mongoose"

import User from "../../models/user.model.js"
import Notification from "../../models/notification.model.js"

const supportFriend = async (req, res) => {
  // Get the supporter, supportee, support amount, token value and remark from the client-side
  const { from, to, token, amount, reference, message, profileImg, user_id } = req.body

  try { 
      // Check if there are any errors in the form
      if (!from || !to || !amount || !reference || !token) {
        res.status(400)
          throw new Error("Empty field(s) available")
      }
      
      // Create the notification message
      const newNotification = new Notification({
        from,
        to,
        token,
        message,
        reference,
        profileImg,
        amount,
        user_id
      })
  
      // Save notification to the database
       const saved = await newNotification.save()
        // Response on success
        res.status(201)
            .json( saved ) 
    } catch (error) {
        res.status(400)
            .json(error)
    }
}

export default supportFriend