import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UpdateProduct = ({token}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Home Cleaner");
  const [subCategory, setSubCategory] = useState("500ml");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);

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
          setCategory(product.category || "Home Cleaner");
          setSubCategory(product.subCategory || "500ml");
          setSizes(product.sizes || []);
          setBestseller(product.bestseller || false);
          setFreeDelivery(product.freeDelivery || false);
          
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

    const productData = {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      freeDelivery,
    };

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/product/update/${id}`,
        productData,{headers:{token}}
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
    }
  };

  if (loading) return <p className="text-center p-5">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Product Name */}
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
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
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            placeholder="Write content here"
            required
          />
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
              <option>Home Cleaner</option>
              <option>Saving</option>
              <option>BulkDealing</option>
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
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px] border rounded"
              type="number"
              placeholder="25"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            {["500ml", "1000ml", "5Liter"].map((size) => (
              <div
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer rounded`}
                >
                  {size}
                </p>
              </div>
            ))}
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
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
