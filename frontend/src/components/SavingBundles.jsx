import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from "../context/ShopContext"
import Title from './Title'
import ProductItem from './ProductItem'

const Saving = () => {

  const {products} = useContext(ShopContext)
  const [saving, setSaving] = useState([])
  useEffect(() => {
    const bestProduct = products.filter((item) => item.category === "SavingBundles"? true : false);
    setSaving(bestProduct.slice(0, 5))
  }, [products])
  
  return (
    
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={"SAVING"} text2={"BUNDLES"} />
      </div>

      {/* Show the Products */}
      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {saving.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} oldPrice={item.oldPrice} freeDelivery={item.freeDelivery}/>
        ))}
      </div>
    </div>


  )
}

export default Saving