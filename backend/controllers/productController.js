import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import jwt from "jsonwebtoken"
// function for add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, oldPrice, category, subCategory, flavors, bestseller, freeDelivery } = req.body;
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    )
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      oldPrice: Number(oldPrice),
      subCategory,
      flavors,
      bestseller: bestseller === "true" ? true : false,
      image: imageUrl,
      freeDelivery: freeDelivery,
      date: Date.now()
    }

    const product = new productModel(productData)
    await product.save()
    res.json({ success: true, message: "Product Added Successfully!" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// ✨ UPDATE PRODUCT (With Image Option)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // ✅ Image update logic
    let updatedImages = [...product.image];
    const files = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ];

    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        const result = await cloudinary.uploader.upload(files[i].path, { resource_type: "image" });
        updatedImages[i] = result.secure_url;
      }
    }

    // ✅ Image remove buttons handle
    for (let i = 0; i < 4; i++) {
      const removeKey = `removeImage${i + 1}`;
      if (req.body[removeKey] === "true") {
        updatedImages[i] = null;
      }
    }

    const filteredImages = updatedImages.filter((img) => img !== null);

    // ✅ Flavors handle (important part)
    let newFlavors;
    if (req.body.flavors) {
      // Agar frontend se string ya array aa rahi hai, usko normalize karo
      if (typeof req.body.flavors === "string") {
        try {
          newFlavors = JSON.parse(req.body.flavors);
        } catch {
          newFlavors = [req.body.flavors];
        }
      } else {
        newFlavors = req.body.flavors;
      }

      // Remove empty strings from flavors array
      if (Array.isArray(newFlavors)) {
        newFlavors = newFlavors.filter((f) => f && f.trim() !== "");
      }
    }

    // ✅ Decide final flavors value
    let finalFlavors;
    if (Array.isArray(newFlavors)) {
      if (newFlavors.length === 0) {
        // agar intentionally empty bheja gaya ho → clear kar do
        finalFlavors = [];
      } else {
        finalFlavors = newFlavors;
      }
    } else {
      // agar flavors field bheji hi nahi to purane flavors rehne do
      finalFlavors = product.flavors;
    }

    // ✅ Update fields
    const updatedFields = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      oldPrice: Number(req.body.oldPrice),
      category: req.body.category,
      subCategory: req.body.subCategory,
      bestseller: req.body.bestseller === "true" || req.body.bestseller === true,
      freeDelivery: req.body.freeDelivery === "true" || req.body.freeDelivery === true,
      flavors: finalFlavors,
      image: filteredImages,
    };

    const updatedProduct = await productModel.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json({ success: true, message: "Product updated successfully!", product: updatedProduct });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// function for add product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({ success: true, products })
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
// function for add product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product Removed" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}
// function for singProduct info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({ success: true, product })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { listProduct, addProduct, removeProduct, singleProduct, updateProduct, getSingleProduct }