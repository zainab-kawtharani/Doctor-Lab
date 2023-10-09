import express from "express";
import { register,login } from "../Controllers/authControllers.js";

const authRouter =express.Router();
//path, function
authRouter.post("/register",register);
authRouter.post("/login",login)


export default authRouter;