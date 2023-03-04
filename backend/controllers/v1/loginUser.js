// VARIABLES
import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'
import { signAccessToken, signRefreshToken } from '../../utils/jwt.js'

/**
 * @description Login User
 * @route POST /api/v1/u/auth
 * @access Public
*/

const loginUser = async (req, res) => {

  // Get all the user details from the request Body
  const { email, password } = req.body; 

  if (!email || !password) return res.status(400).send("All fields are required");

  try {
    const user = await User.findOne({ email });
    
    // Check if username exist
    if (!user) {
        res.status(404)
        throw new Error("Email not found")
    } 

    // Checking if the user password is correct
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        res.status(401)
        throw new Error("Incorrect password")
    }

    // Generating JWT Tokens
    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    // Send this to the frontend
    res.status(200).json({
       accessToken, 
       refreshToken
    });

  } catch (error) {
      res.status(500)
        .json(error.message)
  };
}

export default loginUser;