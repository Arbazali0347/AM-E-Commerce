import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const UpdateProduct = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // 📝 Product Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("HomeCare");
  const [subCategory, setSubCategory] = useState("500ml");
  const [bestseller, setBestseller] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [flavors, setFlavors] = useState([]);

  // 🖼️ Images States
  const [images, setImages] = useState([null, null, null, null]); // new selected files
  const [existingImages, setExistingImages] = useState([]); // old images from DB
  const [removedImages, setRemovedImages] = useState([false, false, false, false]); // track removed

  // 📌 Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/product/id/${id}`);
        if (data.success) {
          const product = data.product;
          setName(product.name || "");
          setDescription(product.description || "");
          setPrice(product.price || "");
          setOldPrice(product.oldPrice || "");
          setCategory(product.category || "HomeCare");
          setSubCategory(product.subCategory || "500ml");
          setBestseller(product.bestseller || false);
          setFreeDelivery(product.freeDelivery || false);
          setFlavors(product.flavors || []);
          setExistingImages(product.image || []);
        } else {
          toast.error("Product not found!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🧠 Function: remove image (shift left after removal)
  const handleRemoveImage = (index) => {
    const newExisting = [...existingImages];
    const newImages = [...images];

    // 🧠 Remove the clicked image
    newExisting.splice(index, 1);
    newImages.splice(index, 1);

    // 🧠 Fill remaining slots with null to keep length 4
    while (newExisting.length < 4) newExisting.push(null);
    while (newImages.length < 4) newImages.push(null);

    setExistingImages(newExisting);
    setImages(newImages);

    // ✅ mark this index as removed (so backend deletes it)
    const removedCopy = [...removedImages];
    removedCopy[index] = true;
    setRemovedImages(removedCopy);
  };

  // ✅ Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("oldPrice", oldPrice);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("freeDelivery", freeDelivery);

      // ✅ Flavors array bhejna (empty hone par bhi clear karne ke liye)
      if (flavors && flavors.length > 0) {
        flavors.forEach((flavor) => {
          formData.append("flavors", flavor);
        });
      } else {
        // ⚠️ Agar flavors empty hain to explicitly empty array bhejna
        formData.append("flavors", JSON.stringify([]));
      }

      // 🖼️ Add images (only if new selected)
      images.forEach((img, idx) => {
        if (img) {
          formData.append(`image${idx + 1}`, img);
        }
      });

      // 🚨 Send which images were removed
      removedImages.forEach((removed, idx) => {
        formData.append(`removeImage${idx + 1}`, removed.toString());
      });

      const { data } = await axios.post(
        `${backendUrl}/api/product/update/${id}`,
        formData,
        { headers: { token, "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success("Product updated successfully!");
        navigate("/list");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center p-5">Loading...</p>;

  const availableFlavors = ["Dove velvet", "lux fusion", "aqua wave"];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">

        {/* 🖼️ Image Upload with ❌ remove */}
        <div>
          <p className="mb-2">Upload Images</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <label>
                  <img
                    className="w-20 h-20 object-cover border rounded"
                    src={
                      images[i]
                        ? URL.createObjectURL(images[i])
                        : existingImages[i] || assets.upload_area
                    }
                    alt=""
                  />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const newImages = [...images];
                      newImages[i] = file;
                      setImages(newImages);
                    }}
                  />
                </label>

                {/* ❌ Remove Button */}
                {(existingImages[i] || images[i]) && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 📝 Product name */}
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        {/* 📝 Description */}
        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            placeholder="Write content here"
            required
          />
        </div>

        {/* 🍧 Flavors selection */}
        <div className="w-full">
          <p className="mb-2">Select Flavors</p>
          <div className="flex flex-wrap gap-3">
            {availableFlavors.map((flavor, index) => (
              <label
                key={index}
                className="flex items-center gap-2 border px-3 py-1 rounded cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={flavors.includes(flavor)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFlavors([...flavors, flavor]);
                    } else {
                      setFlavors(flavors.filter((f) => f !== flavor));
                    }
                  }}
                />
                {flavor}
              </label>
            ))}
          </div>
        </div>

        {/* 🧠 Category / SubCategory / Price */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option>HomeCare</option>
              <option>SavingBundles</option>
            </select>
          </div>

          <div>
            <p className="mb-2">SubCategory</p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option>500ml</option>
              <option>1000ml</option>
              <option>5Liter</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Price</p>
            <input
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="w-full px-3 py-2 sm:w-[120px] border rounded"
              placeholder="25"
            />
          </div>

          <div>
            <p className="mb-2">Old Price</p>
            <input
              value={oldPrice || ""}
              onChange={(e) => setOldPrice(e.target.value)}
              type="number"
              className="w-full px-3 py-2 sm:w-[120px] border rounded"
              placeholder="25"
            />
          </div>
        </div>

        {/* ⭐ Bestseller */}
        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>

        {/* 🚚 Free Delivery */}
        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setFreeDelivery((prev) => !prev)}
            checked={freeDelivery}
            type="checkbox"
            id="freeDelivery"
          />
          <label className="cursor-pointer" htmlFor="freeDelivery">
            Free Delivery
          </label>
        </div>

        {/* 💾 Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
