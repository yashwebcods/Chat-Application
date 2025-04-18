import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        requireed:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        requireed:true  
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
},{
    timestamps:true
})

const Message = mongoose.model('Message',messageSchema)

export default Message