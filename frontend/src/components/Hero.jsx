import React, { useContext } from 'react'
import {assets} from "../assets/assets"
import { ShopContext } from '../context/ShopContext'
const Hero = () => {
  const { navigate} = useContext(ShopContext)
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 max-h-100'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text=[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className=' font-medium text-sm md:text-base'>CLEANING SOLUTIONS</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">AM CHEMICALS</h1>
          <div className='flex items-center gap-2'>
            <p onClick={()=> navigate("/collection")} className='font-semibold text-sm md:text-base cursor-pointer hover:text-gray-500'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <img src={assets.hero_img} alt="" className='w-full sm:w-1/2 object-cover overflow-hidden sm:object-top'/>
    </div>
  )
}

export default Hero