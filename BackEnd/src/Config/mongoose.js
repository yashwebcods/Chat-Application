import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://ysiddhapura6:MCcsIdXQDxBOtWeK@cluster0.2mi8v.mongodb.net/Chat_db')
const db = mongoose.connection

if(db){
    console.log('db is connected ');
}else{
    console.log('db not connected');   
}

export default  db 
