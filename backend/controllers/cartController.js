import userModel from "../models/userModel.js";

// add product to user cart 
const addCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            cartData[itemId] += 1;   // agar already hai to +1
        } else {
            cartData[itemId] = 1;    // new item
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        cartData[itemId] = quantity; // direct quantity set karo

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated successfully!" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addCart, updateCart, getUserCart };
