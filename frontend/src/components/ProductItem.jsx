import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, oldPrice, discount, freeDelivery }) => {
  const { currency } = useContext(ShopContext)
  useEffect(() => {
    console.log(oldPrice);
  }, [])
  
  return (
    <Link
      to={`/product/${id}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Free Delivery Tag (Top-Left) */}
        {freeDelivery && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Free Delivery
          </span>
        )}

        {/* Discount Tag (Top-Right) */}
        {discount && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between h-32">
        {/* Title Full */}
        <p className="text-gray-800 font-medium text-base leading-snug">
          {name}
        </p>

        {/* Price Section (Always at Bottom) */}
        <div className="flex items-center gap-2 mt-auto">
          {oldPrice && (
            <p className="text-gray-400 text-sm line-through">
              {currency}{oldPrice}
            </p>
          )}
          <p className="text-red-600 font-bold text-lg">
            {currency}{price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
