import exprees from "express"
import { addCart, getUserCart, updateCart } from "../controllers/cartController.js"
import authUser from "../middlewares/auth.js";

const cartRoute = exprees.Router();

cartRoute.post("/get", authUser,getUserCart)
cartRoute.post("/add", authUser, addCart)
cartRoute.post("/update", authUser, updateCart)

export default cartRoute;