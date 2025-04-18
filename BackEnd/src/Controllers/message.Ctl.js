import User from '../Models/user.model.js'
import Message from '../Models/message.model.js'
import cloudnairy from '../lib/cloudimary.js';
import { getReseverSocketId , io} from '../lib/socket.js';

export const getUser = async (req, res) => {
    try {
        const loginUserId = req.user._id;

        const filterUser = await User.find({ _id: { $ne: loginUserId } }).select("-password");

        res.status(200).json(filterUser);
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server error', error: err.message })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        })
        res.status(200).json(message);
    } catch (err) {
        console.log('Error in getMessage Ctl : ', err.message);
        return res.status(500).json({ error: 'internal server error' })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uplodImage = await cloudnairy.uploader.upload(image)
            imageUrl = uplodImage.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();
        const receiverSocketId = getReseverSocketId(receiverId)

        if(receiverId){
           io.to(receiverSocketId).emit('newMessage',newMessage)      
        }

        res.status(200).json(newMessage)

    } catch(err){
        console.log('Error in sendMessage Ctl : ', err.message);
        return res.status(500).json({ error: 'internal server error' })
    }
}