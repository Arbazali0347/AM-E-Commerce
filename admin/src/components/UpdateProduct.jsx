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

  // States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("HomeCare");
  const [subCategory, setSubCategory] = useState("500ml");
  const [bestseller, setBestseller] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [flavors, setFlavors] = useState([]); // 👈 Array rakha hai

  // Images
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Existing image URLs
  const [existingImages, setExistingImages] = useState([]);

  // Fetch product data
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
          setFlavors(product.flavors || []); // 👈 flavors array set kiya
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

  // Submit handler
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

      // Flavors array bhejna
      if (flavors.length > 0) {
        flavors.forEach((flavor) => {
          formData.append("flavors", flavor);
        });
      }

      // Images
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

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

  // Available flavors (jo tu select karna chahta hai)
  const availableFlavors = ["Rose", "Lemon", "Jasmine", "Lavender", "Mint"];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">

        {/* Images */}
        <div>
          <p className="mb-2">Upload Images</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <label key={i}>
                <img
                  className="w-20 h-20 object-cover border"
                  src={
                    [image1, image2, image3, image4][i]
                      ? URL.createObjectURL([image1, image2, image3, image4][i])
                      : existingImages[i] || assets.upload_area
                  }
                  alt=""
                />
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (i === 0) setImage1(file);
                    if (i === 1) setImage2(file);
                    if (i === 2) setImage3(file);
                    if (i === 3) setImage4(file);
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
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

        {/* Description */}
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

        {/* Flavors Selection */}
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

        {/* Category, SubCategory, Price */}
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

        {/* Bestseller */}
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

        {/* Free Delivery */}
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

        {/* Submit */}
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
