import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true 
    },
    image:{
        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)

export default User