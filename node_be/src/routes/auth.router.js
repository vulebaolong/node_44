import express from "express"
import { login, loginFacebook, register } from "../controllers/auth.contrller.js"
const authRouter = express.Router()

authRouter.post(`/register`, register)

authRouter.post(`/login`, login)

authRouter.post(`/login-facebook`, loginFacebook)

export default authRouter