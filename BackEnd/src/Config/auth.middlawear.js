import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

export const proctedRoute = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'You are not authenticated' });
        }
        let decoded;
        try {
            decoded = jwt.verify(token,process.env.jwt_secret);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' }); 
        }
        
        let isUser = await User.findOne({_id:decoded.userId}).select("-password")
        if (!isUser) {
            return res.status(404).json({ message: 'You are not signed up yet' }); 
        }
        req.user = isUser;
        next();

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message }); 
    }
};
