import { tokenGenerator } from '../lib/utils.js'
import bcrypt from 'bcrypt'
import User from '../Models/user.model.js'
import cloudnairy from '../lib/cloudimary.js';


export const Signup = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        if (password.length < 6) {
            res.status(400).json({ message: 'Password must be greater than 6 characters' });
        }

        // Check if the user already exists before creating a new one
        let isExist = await User.findOne({ email });
        if (isExist) {
            res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        let hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object
        let newUser = new User({
            fullName,
            email,
            password: hashedPassword // Save hashed password, not plain text
        });

        // Save user to database

        if (newUser) {
            await newUser.save();
            tokenGenerator(newUser._id, res)
            res.status(201).json({ message: 'User registered successfully' });
        }

        res.status(500).json({ message: 'Failed to register user' });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }

}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        let isExist = await User.findOne({ email })
        if (!isExist) {
            return res.status(401).json({ message: 'Invalid credential' })
        }
        let isRightPassword = await bcrypt.compare(password, isExist.password)
        if (!isRightPassword) {
            return res.status(401).json({ message: 'Invalid credential' })
        }
        tokenGenerator(isExist._id, res)
        return res.status(200).json({
            _id: isExist._id,
            fullName: isExist.fullName,
            email: isExist.email,
            image: isExist.image
        })
    } catch (err) {
        return res.status(501).json({ message: 'Internal server error' })
    }
}

export const Logout = (req, res) => {
    try {
         res.cookie("jwt", "", { maxAge: 0 })
        return res.status(200).json({ message: 'Logout succes' })
    } catch (err) {
        return res.status(501).json({ message: 'Logout failed' })
    }
    
}

export const updateProfile = async (req, res) => {
    try {
        
        const { image } = req.body
        const userId = req.user._id
        
        if (!image) {
            return res.status(400).json({ message: "Profile pic is required" })
        }
        
        const uploadRes = await cloudnairy.uploader.upload(image)
        const updatedUser = await User.findByIdAndUpdate(userId,{ image: uploadRes.secure_url }, { new: true })
        
        return res.status(200).json(updatedUser)

    } catch (err) {
        res.status(501).json({err:err.message})
                    console.log(req.headers.origin)
        
        console.log(err.message);
        
    }
}

export const checkuser = (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (err) {
        console.log("Error in checkauth-Controller", err)
        return res.status(500).json({ message: "Internal Servre Error", err: err.message })
    }
}
