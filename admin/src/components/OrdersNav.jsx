import React from 'react'
import { NavLink, Link } from "react-router-dom"

const OrdersNav = () => {
    return (
        <div>
            <ul className='sm:flex sm:justify-between text-gray-700 bg-white mb-10'>
                <NavLink to="/orders" className="py-1 px-4 flex flex-col items-center">
                    <p>ALL ORDERS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/packing" className="py-1 px-4  flex flex-col items-center">
                    <p>PACKING ORDERS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/placed" className="py-1 px-4  flex flex-col items-center">
                    <p>PLACED ORDERS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/out-of-delivery" className="py-1 px-4  flex flex-col items-center">
                    <p>OUT OF DELIVERY ORDERS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/delivered" className="py-1 px-4  flex flex-col items-center">
                    <p>DELIVERED ORDERS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
        </div>
    )
}

export default OrdersNav