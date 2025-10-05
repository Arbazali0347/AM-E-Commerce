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

    // 🟡 Get existing product
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // 🟡 Image Upload (optional)
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

    let uploadedUrls = [];
    if (images.length > 0) {
      uploadedUrls = await Promise.all(
        images.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
          return result.secure_url;
        })
      );
    }

    // 🟡 Build updated fields
    const updatedFields = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      oldPrice: Number(req.body.oldPrice),
      category: req.body.category,
      subCategory: req.body.subCategory,
      bestseller: req.body.bestseller === "true" || req.body.bestseller === true,
      freeDelivery: req.body.freeDelivery === "true" || req.body.freeDelivery === true,
      flavors: req.body.flavors,
    };

    // 🟡 If new images uploaded → replace; else keep old
    if (uploadedUrls.length > 0) {
      updatedFields.image = uploadedUrls;
    }

    // 🟡 Update in DB
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

export { listProduct, addProduct, removeProduct, singleProduct, updateProduct, getSingleProduct}