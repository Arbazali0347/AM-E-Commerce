import userModel from "../models/userModel.js";

// add product to user cart 
const addCart = async (req, res) => {
    try {
        const { userId, itemId, flavor } = req.body;  // flavor add kiya
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {}; // product object create karo
        }

        if (cartData[itemId][flavor]) {
            cartData[itemId][flavor] += 1; // flavor quantity +1
        } else {
            cartData[itemId][flavor] = 1; // new flavor
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
        const { userId, itemId, flavor, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][flavor] = quantity; // flavor wise quantity update

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
