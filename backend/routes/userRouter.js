import express from "express"
import { loginUser, registerUser, adminLogin } from "../controllers/useController.js"

const userRoute = express.Router();

userRoute.post("/login", loginUser);
userRoute.post("/register", registerUser);
userRoute.post("/admin", adminLogin);

export default userRoute;