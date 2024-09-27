import express from "express";
import { register } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// register
authRouter.post("/register", register);

export default authRouter;
