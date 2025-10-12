import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from "../context/ShopContext"
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

  const {products, loading} = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])
  
  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestseller));
    setBestSeller(bestProduct);
    
  }, [products])
  
  return (
    
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={"BEST"} text2={"SELLERS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {loading
          ? // 🦴 Skeleton Loader Cards (Facebook style)
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-2 animate-pulse"
              >
                <div className="h-56 bg-gray-200 rounded-t-xl mb-3"></div>
                <div className="space-y-2 px-2 pb-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          : // 🛍️ Actual Product Cards
            bestSeller.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                oldPrice={item.oldPrice}
                freeDelivery={item.freeDelivery}
              />
            ))}
      </div>
    </div>


  )
}

export default BestSeller