import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, oldPrice, discount, freeDelivery }) => {
  const { currency } = useContext(ShopContext);
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/product/${id}`}
      className="block bg-white rounded-xl transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-xl h-56">
        <img
          src={image[0]}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-[2000ms] ease-in-out ${
            hovered && image[1]
              ? "opacity-0 scale-110"
              : hovered
              ? "opacity-100 scale-110"
              : "opacity-100 scale-100"
          }`}
        />
        {image[1] && (
          <img
            src={image[1]}
            alt={name}
            className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-[1200ms] ease-in-out ${
              hovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Free Delivery Tag */}
        {freeDelivery && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Free Delivery
          </span>
        )}

        {/* Discount Tag */}
        {discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="pt-4 pb-8 flex flex-col justify-between min-h-36 sm:min-h-32">
        <p className="text-gray-900 font-medium text-sm sm:text-base leading-snug break-words">
          {name}
        </p>

        <div className="flex items-center gap-2 mt-auto flex-wrap">
          {oldPrice && (
            <p className="text-gray-500 text-xs sm:text-sm line-through">
              {currency}{oldPrice}
            </p>
          )}
          <p className="text-red-700 text-xs sm:text-lg break-words">
            {currency}{price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
