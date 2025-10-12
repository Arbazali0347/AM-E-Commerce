import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, loading } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [isFading, setIsFading] = useState(false); // 🌟 new state for fade transition

  // 🟡 Product fetch from context
  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
    fetchProductData();
  }, [productId, products]);

  // 🟢 Default flavor select if available
  useEffect(() => {
    if (productData && productData.flavors && productData.flavors.length > 0) {
      setSelectedFlavor(productData.flavors[0]);
    } else {
      setSelectedFlavor(""); // ✅ flavor reset if none
    }
  }, [productData]);

  // 🌀 Image change handler with fade effect
  const handleImageChange = (newImage) => {
    if (newImage !== image) {
      setIsFading(true); // fade out
      setTimeout(() => {
        setImage(newImage);
        setIsFading(false); // fade in
      }, 250); // 250ms light transition
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 px-2 sm:px-8 lg:px-13">
      <div className="flex gap-12 sm:gap-16 flex-col sm:flex-row">
        {/* ---------------- Left Side (Images) ---------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18%] w-full gap-2 sm:gap-3">
            {productData.image.map((item, index) => (
              <img
                onClick={() => handleImageChange(item)}
                src={item}
                alt=""
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg border-2 transition 
                  ${item === image ? "border-black" : "border-transparent hover:border-gray-300"}`}
              />
            ))}
          </div>

          {/* Main Image with Fade Transition */}
          <div className="w-full sm:w-[82%]">
            <img
              src={image}
              alt={productData.name}
              className={`w-full h-auto rounded-2xl shadow-lg border transition-opacity duration-300 ease-in-out 
                ${isFading ? "opacity-0" : "opacity-100"}`}
            />
          </div>
        </div>

        {/* ---------------- Right Side ---------------- */}
        <div className="flex-1">
          <h1 className="font-bold text-2xl sm:text-3xl">{productData.name}</h1>

          {/* 💰 Price Section */}
          <div className="mt-auto flex items-center gap-2">
            <span className="text-3xl text-red-600">
              {currency}
              {productData.price}
            </span>
            {productData.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                {currency}
                {productData.oldPrice}
              </span>
            )}
          </div>

          {/* 🧂 Flavor Selection */}
          {productData.flavors && productData.flavors.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Select Flavor:</h3>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                className="px-3 py-2 border rounded w-full max-w-[250px]"
              >
                {productData.flavors.map((flavor, index) => (
                  <option key={index} value={flavor}>
                    {flavor}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 🚚 Free Delivery Badge */}
          {productData.freeDelivery && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full shadow-md text-sm font-semibold animate-pulse mt-4">
              🚚 Free Delivery
            </div>
          )}

          {/* 📜 Description */}
          {productData.description && (
            <div
              className="mt-5 text-gray-600 leading-relaxed md:w-4/5 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: productData.description }}
            ></div>
          )}

          {/* 🛒 Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, selectedFlavor)}
            disabled={loading}
            className="bg-black hover:bg-gray-900 text-white px-10 py-3 text-sm rounded-xl shadow-md transition disabled:opacity-50 mt-10"
          >
            {loading ? "Loading..." : "ADD TO CART"}
          </button>

          {/* ℹ️ Extra Info */}
          <hr className="mt-10 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-6 flex flex-col gap-2">
            <p>✅ 100% Original product.</p>
            <p>🚚 Cash on delivery available.</p>
            <p>↩️ Easy return & exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ------------- RELATED PRODUCTS ---------------- */}
      <div className="mt-16">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
