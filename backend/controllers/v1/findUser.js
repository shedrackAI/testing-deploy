// VARIABLES
import User from "../../models/user.model.js"

const findUser = async (req, res) => {
  const { name } = req.body

  try {
    const user = await User.findOne({ name })
    if (!user) return res.status(404).json('User not found')
  
    const userInfo = {
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      website: user.website,
      twitter: user.twitterHandle,
      instagram: user.instagramHandle,
      bio: user.aboutMe,
      supporters: user.supporters.length,
      inviteLink: user.inviteLink
    }
  
    // Response on success
    res.status(200).json(userInfo)  
  } catch (err) {
    throw err.message
  }
}

export default findUser