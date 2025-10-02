import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Footer = () => {
    const { navigate } = useContext(ShopContext)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
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
                        <li onClick={() => { navigate("/"), scrollToTop() }} className="cursor-pointer hover:underline">Home</li>
                        <li onClick={() => { navigate("/about"), scrollToTop() }} className="cursor-pointer hover:underline" >About us</li>
                        <li onClick={() => { navigate("/delivery"), scrollToTop() }} className="cursor-pointer hover:underline" >Delivery</li>
                        <li onClick={() => { navigate("/policy"), scrollToTop() }} className="cursor-pointer hover:underline" >Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li className='cursor-pointer hover:underline' ><a href={`https://wa.me/923451081010?text=${encodeURIComponent("I am your customer!")}`} target="_blank" rel="noopener noreferrer"
                        > (+92) 345 1081010 </a> </li>
                        <li className='cursor-pointer hover:underline'><a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=amchemicalstore@gmail.com&su=Hello&body=I%20want%20to%20ask%20about%20your%20products"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            amchemicalstore@gmail.com
                        </a>

                        </li>
                        <li onClick={() => window.open("https://www.instagram.com/am_chemical_store", "_blank")} className="cursor-pointer hover:underline">Instagram</li>
                        <li onClick={() => window.open("https://www.linkedin.com/in/am-chemicals-store-undefined-823161381/", "_blank")} className="cursor-pointer hover:underline">LinkedIn</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center bg-blue-300">Copyright 2024@ amchemicalstore.com - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer