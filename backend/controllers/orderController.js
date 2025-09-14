import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing order using COD method 
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: new Date().getTime(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success: true, message: "Order Placed Successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// All Order data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
// user order data fro frontend
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
// Update Order Status by admin
const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success: true, message: "Status Updated Successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export {
    placeOrder,
    allOrders,
    userOrders,
    updateStatus
}

