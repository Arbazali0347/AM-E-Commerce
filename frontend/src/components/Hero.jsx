// import React, { useContext } from 'react'
// import { assets } from "../assets/assets"
// import { ShopContext } from '../context/ShopContext'

// const Hero = () => {
//   const { navigate } = useContext(ShopContext)

//   return (
//     <div className="flex flex-col-reverse sm:flex-row items-center justify-between bg-gray-50 rounded-xl overflow-hidden shadow-md">

//       {/* Left Side */}
//       <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start text-center sm:text-left p-4 sm:p-6">
//         <div className="flex items-center gap-2 mb-2">
//           <p className="w-6 h-[2px] bg-gray-700"></p>
//           <span className="text-gray-600 font-medium text-xs sm:text-sm tracking-widest">
//             CLEANING SOLUTIONS
//           </span>
//         </div>

// <h1 className="wave-text font-bold text-xl sm:text-2xl lg:text-3xl leading-snug mb-3">
//   <span>A</span>
//   <span>M</span>
//   <span className='ml-1'>C</span>
//   <span>H</span>
//   <span>E</span>
//   <span>M</span>
//   <span>I</span>
//   <span>C</span>
//   <span>A</span>
//   <span>L</span>
//   <span>S</span>
// </h1>

//         <p className="text-gray-600 text-xs sm:text-sm mb-4 max-w-xs">
//           Welcome to AM Chemicals, where we believe in the power of a clean home.
//         </p>

// <button
//   onClick={() => navigate("/collection")}
//   className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:bg-gray-800 transition"
// >
//   SHOP NOW
// </button>
//       </div>

//       {/* Right Side */}
//       <div className="w-full sm:w-1/2 h-[150px] sm:h-[200px]">
//         <img
//           src={assets.hero_img}
//           alt="Hero"
//           className="w-full h-full object-contain animate-zoom"
//         />
//       </div>
//     </div>
//   )
// }

// export default Hero
import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { ShopContext } from '../context/ShopContext'

const Hero = () => {
  const { navigate } = useContext(ShopContext)

  return (
    <div className="relative w-full overflow-hidden">
      {/* Banner Image */}
      <img
        src={assets.hero_img}
        alt="Hero Banner"
        className="w-full h-[110px] sm:h-[310px] object-cover"
      />
    </div>
  )
}

export default Hero
