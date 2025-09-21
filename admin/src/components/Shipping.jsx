import React, { useContext } from 'react'
import OrdersNav from './OrdersNav'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'
import Loading from './Loading'
import { ordersContext } from '../context/OrdersContext'
import OrderCard from './OrderCard'
import OrderTable from './OrderCard'
// this name like Placed File 
const Shipping = () => {
  const { orders, token, fetchAllOrders, loading } = useContext(ordersContext);
  const [shippingOrders, setShippingOrders] = useState([])

  const fetchShippingOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const filtered = orders.filter(order => order.status === "Shipped").reverse();
      setShippingOrders(filtered);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } })
      if (data.success) {
        await fetchAllOrders()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchShippingOrders();
  }, [token, orders])
  return (
    <div>
      <OrdersNav />
      <h1 className="text-xl font-semibold mb-4">Shipped</h1>
      <div>
        {loading ? <Loading /> : (
          <OrderTable
            orders={shippingOrders}
            statusHandler={statusHandler}
            showStatus={true}  // admin side me dropdown hoga
          />
        )}
      </div>
    </div>
  )
}

export default Shipping