import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    flavors: { type: [String], default: [] }, // ✅ New field for flavors
    bestseller: { type: Boolean },
    freeDelivery: { type: Boolean, default: false },
    date: { type: Number, required: true }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
