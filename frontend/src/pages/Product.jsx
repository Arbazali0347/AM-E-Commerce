import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { ShopContext } from '../context/ShopContext';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, loading } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-2 sm:px-8 lg:px-13">
      <div className="flex gap-12 sm:gap-16 flex-col sm:flex-row">
        {/*------------------- Left Side Image ---------------------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18%] w-full gap-2 sm:gap-3">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                alt=""
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg border-2 transition 
                  ${item === image ? "border-black" : "border-transparent hover:border-gray-300"}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[82%]">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-auto rounded-2xl shadow-lg border"
            />
          </div>
        </div>

        {/*---------------- Right Side -----------------*/}
        <div className="flex-1">
          <h1 className="font-bold text-2xl sm:text-3xl">{productData.name}</h1>
          <p className="mt-4 text-3xl font-semibold text-gray-800">
            {currency}{productData.price}
          </p>
          <div className='mt-5 ml-1'>
            {productData.freeDelivery && (
              <p className="text-green-600 font-semibold">Free Delivery</p>
            )}
          </div>
          <p className="mt-5 text-gray-600 leading-relaxed md:w-4/5">
            {productData.description}
          </p>

          {/* ❌ Removed Variation Section (size selection) */}

          {/* ✅ Add to Cart Button (no size required now) */}
          <button
            onClick={() => addToCart(productData._id)}  // 👈 size argument removed
            disabled={loading}
            className="bg-black hover:bg-gray-900 text-white px-10 py-3 text-sm rounded-xl shadow-md transition disabled:opacity-50 mt-10"
          >
            {loading ? "Loading..." : "ADD TO CART"}
          </button>

          {/* Info */}
          <hr className="mt-10 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-6 flex flex-col gap-2">
            <p>✅ 100% Original product.</p>
            <p>🚚 Cash on delivery available.</p>
            <p>↩️ Easy return & exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ------------- RELATED PRODUCTS -------------------------- */}
      <div className="mt-16">
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
