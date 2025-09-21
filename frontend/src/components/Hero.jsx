import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { ShopContext } from '../context/ShopContext'

const Hero = () => {
  const { navigate } = useContext(ShopContext)

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between bg-gray-50 rounded-xl overflow-hidden shadow-md">

      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start text-center sm:text-left p-10 sm:p-16">
        <div className="flex items-center gap-3 mb-4">
          <p className="w-10 h-[2px] bg-gray-700"></p>
          <span className="text-gray-600 font-medium text-sm sm:text-base tracking-widest">
            CLEANING SOLUTIONS
          </span>
        </div>

        <h1 className="wave-text font-bold text-3xl sm:text-4xl lg:text-5xl leading-snug mb-6">
          <span>A</span>
          <span>M</span>
          <span className='ml-3'>C</span>
          <span>H</span>
          <span>E</span>
          <span>M</span>
          <span>I</span>
          <span>C</span>
          <span>A</span>
          <span>L</span>
          <span>S</span>
        </h1>


        <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md">
          Welcome to AM Chemicals, where we believe in the power of a clean home. We're passionate about providing high-quality, effective, and eco-friendly cleaning products.
        </p>
        <button
          onClick={() => navigate("/collection")}
          className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-md hover:bg-gray-800 transition"
        >
          SHOP NOW
        </button>
      </div>

      {/* Right Side */}
      <div className="w-full sm:w-1/2 h-[300px] sm:h-full">
        <img
          src={assets.hero_img}
          alt="Hero"
          className="w-full h-full object-cover animate-zoom"
        />
      </div>
    </div>
  )
}

export default Hero
