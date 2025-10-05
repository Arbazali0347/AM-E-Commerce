import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import couter from "../models/couter.js";

// placing order using COD method 
const placeOrder = async (req, res) => {
    try {
        async function getNextTrackingId() {
            const counter = await couter.findOneAndUpdate(
                { name: "orderId" },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            return `${counter.seq}`;
        }

        const trackingId = await getNextTrackingId();
        console.log("📦 placeOrder BODY:", req.body);
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            trackingId: trackingId,
            date: new Date().getTime(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed Successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// All Order data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        let message = "Something went wrong, please try again later.";
        // Agar internet / network related issue hai
        if (
            error.name === "MongoNetworkError" ||
            error.message.includes("ECONNREFUSED") ||
            error.message.includes("ENOTFOUND") ||
            error.message.includes("ETIMEDOUT")
        ) {
            message = "Network issue! Please check your internet connection.";
        }
        res.json({ success: false, message })
    }
}
// user order data fro frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// Update Order Status by admin
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated Successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// Delete Order by admin
const deleteOrder = async (req, res) => {
    try {
        console.log("DELETE hit:", req.body);
        const { id } = req.body;
        await orderModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Order deleted successfully" });
    } catch (err) {
        console.error("Delete Order Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
export {
    placeOrder,
    allOrders,
    userOrders,
    updateStatus,
    deleteOrder
}

