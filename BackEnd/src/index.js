import express from 'express';
import dotenv from 'dotenv';
import db from './Config/mongoose.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import path from 'path'

import authRouter from './Routes/auth.route.js';
import messsageRoute from './Routes/message.route.js'
import { app,server } from './lib/socket.js';
dotenv.config();
const port = 8001;
const __dirname = path.resolve() 

app.use(cookieParser());
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors({
  origin:["https://chat-application-s8vu.onrender.com"], 
  credentials: true 
}));

app.use("/api/auth", authRouter);
app.use("/api/message", messsageRoute);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,'../FrontEnd/dist/')))

  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../FrontEnd","dist","index.html"))
  })
}

server.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('server is connected',port);

})
export default app;
