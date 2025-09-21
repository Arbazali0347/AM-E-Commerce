import express from 'express';
import adminAuth from '../middlewares/adminAuth.js';
import { allOrders, updateStatus, placeOrder, userOrders, deleteOrder  } from '../controllers/orderController.js';
import authUser from '../middlewares/auth.js';


const  orderRouter = express.Router();

//Admin features
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

//payment features
orderRouter.post("/place",authUser,placeOrder)
// User features
orderRouter.post("/userorders",authUser,userOrders)
orderRouter.post("/:id", adminAuth, deleteOrder);

export default orderRouter;