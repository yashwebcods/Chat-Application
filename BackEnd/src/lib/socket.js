import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)
const io = new Server(server,
    {
        cors: {
            origin: ['https://chat-application-s8vu.onrender.com']
        }
    }
)

export function getReseverSocketId(userId){
    return  userSocketMap[userId]
}

const userSocketMap = {}

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    const userId = socket.handshake.query.userId;
    
    if (userId) {
        userSocketMap[userId] = socket.id
    }
    
    io.emit("getOnlineUser", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId]    
        io.emit("getOnlineUser", Object.keys(userSocketMap))
    });
})

export { io, app, server }