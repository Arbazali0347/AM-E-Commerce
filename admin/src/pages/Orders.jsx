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
import OrderCard from '../components/OrderCard'
import OrderTable from '../components/OrderCard'
const Orders = () => {
  const { orders, fetchAllOrders, token, loading } = useContext(ordersContext);

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
      <OrdersNav />
      <h2>All Orders</h2>
      <div>
        {loading ? <Loading /> : (
          <OrderTable
            orders={orders}
            statusHandler={statusHandler}
            showStatus={true}  // admin side me dropdown hoga
          />
        )}
      </div>
    </div>
  )
}

export default Orders