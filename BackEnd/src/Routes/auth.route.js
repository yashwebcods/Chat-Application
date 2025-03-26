import express from "express"
import { checkuser, Login, Logout, Signup, updateProfile } from "../Controllers/auth.Ctl.js"
import { proctedRoute } from "../Config/auth.middlawear.js"
const route = express.Router()

route.post('/signup', Signup)
route.post('/login', Login)

route.get('/logout', Logout)

route.put('/update-profile', proctedRoute , updateProfile)
route.get('/check' , proctedRoute , checkuser)


export default route ;
