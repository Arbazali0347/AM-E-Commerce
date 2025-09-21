import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, freeDelivery }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      to={`/product/${id}`}
      className="group block bg-white rounded-xl border hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-800 font-medium text-base truncate mb-1">
          {name}
        </p>
        <p className="text-gray-900 font-semibold text-lg">
          {currency}{price}
        </p>
        {freeDelivery && (
          <p className="text-green-600 font-semibold">Free Delivery</p>
        )}
      </div>
    </Link>
  )
}

export default ProductItem
