import jwt from "jsonwebtoken";
import User from '../models/user.model.js';

// This function will create the AccessToken
const signAccessToken = (userId) => {

    let token; // The token

    const payload = {
        id: userId,
    };
    
    const options = {
        expiresIn: '1y',
        issuer: "fundafriend.com",
        audience: [userId],
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;

    try {
        token = jwt.sign( payload, secret, options); // Sign / Create the jsonWebToken
        return token
    } catch (error) {
        return error.message
    }
};


// This function will create the RefreshToken
const signRefreshToken = (userId) => {
    
    let token; // The token

    const payload = {
        id: userId,
    };

    const options = {
        expiresIn: '1y',
        issuer: "fundafriend.com",
        audience: [userId],
    }

    const secret = process.env.REFRESH_TOKEN_SECRET;

    try {
        token = jwt.sign( payload, secret, options) // Sign / Create the jsonWebToken
        return token
    } catch (error) {
        return error.message
    }
};


const verifyAccessToken = async (req, res, next) => {
    let token; // The access token

    if (req.headers['authorization']) {
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        token = bearerToken[1];
    
        try {
            // Verify the token
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
            // Get the user from the token
            req.user = await User.findById(decode.id).select('-password');
    
            next();

        } catch (error) {
            res.status(401)
            json('Not authorized');
        }
    };

    if (!token) {
        res.status(401)
        .json('Not authorized, no token');
    }
}

export {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
};