import React, { useContext } from 'react'
import { useState } from 'react'
import axios from "axios"
import { backendUrl, currency } from '../App'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import OrdersNav from '../components/OrdersNav'
import Loading from '../components/Loading'
import { ordersContext } from '../context/OrdersContext'
const Orders = () => {
  const {orders, fetchAllOrders, token, loading} = useContext(ordersContext);

  const statusHandler = async (event, orderId) => {
      console.log(event.target.value, orderId);
      try {
        const { data } = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } })
        if (data.success) {
          await fetchAllOrders();
          toast.success(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <OrdersNav/>
      <h2>All Orders</h2>
      <div>
        { loading ? <Loading/> : (
          orders.map((order, index) => (
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    // fixed: use optional chaining, correct field name `quantity`, and unique key
                    order.items?.map((item, itemIdx) => {
                      return (
                        <p className='py-0.5' key={`${index}-${itemIdx}`}>
                          {item.name} x Quantity:  {item.quantity ?? item.quanitity}  - <span>{item.size} </span>
                        </p>
                      )
                    })
                  }
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders