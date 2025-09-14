import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} alt="" className='mb-5 w-32' />
                    <p className='w-full md:w-2/3 text-gray-600'>Welcome to AM Chemicals, where we believe in the power of a clean home. We're passionate about providing high-quality, effective, and eco-friendly cleaning products that make your life easier and your home a healthier place.</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>(+92) 345 1081010 </li>
                        <li>amchemicalstore@gmail.com</li>
                        <li onClick={() => window.open("https://www.instagram.com/am_chemical_store", "_blank")}  className="cursor-pointer hover:underline">Instagram</li>
                        <li onClick={() => window.open("https://www.linkedin.com/in/am-chemicals-store-undefined-823161381/", "_blank")}  className="cursor-pointer hover:underline">LinkedIn</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2024@ amchemicalstore.com - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer