import express from 'express'
import { proctedRoute } from '../Config/auth.middlawear.js'
import { getMessage, getUser , sendMessage } from '../Controllers/message.Ctl.js'
const route = express.Router()

route.get('/users' , proctedRoute , getUser)
route.get('/:id',proctedRoute,getMessage)
route.post('/send/:id' , proctedRoute , sendMessage)

export default route ;