import express from 'express';
import dotenv from 'dotenv';
import db from './Config/mongoose.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

import authRouter from './Routes/auth.route.js';
import messsageRoute from './Routes/message.route.js'
dotenv.config();
const port = 8001;
const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors({
  origin:["http://localhost:5173", "http://localhost:5174"], 
  credentials: true 
}));

app.use("/api/auth", authRouter);
app.use("/api/message", messsageRoute);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('server is connected',port);

})
export default app;
