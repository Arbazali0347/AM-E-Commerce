import React, { useContext, useEffect, useState } from 'react'
import OrdersNav from './OrdersNav'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'
import Loading from './Loading'
import { ordersContext } from '../context/OrdersContext'
import OrderCard from './OrderCard'
import OrderTable from './OrderCard'

const Packing = () => {
  const { orders, fetchAllOrders, token, loading } = useContext(ordersContext);
  const [packingOrders, setPackingOrders] = useState([])
  const fetchPakingOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const filtered = orders.filter(order => order.status === "Packing");
      setPackingOrders(filtered);
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
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
    fetchPakingOrders();
  }, [token, orders])
  return (
    <div>
      <OrdersNav />
      <h1 className="text-xl font-semibold mb-4">Packing</h1>

      <div>
        {loading ? <Loading /> : (
          <OrderTable
            orders={packingOrders}
            statusHandler={statusHandler}
            showStatus={true}  // admin side me dropdown hoga
          />
        )}
      </div>
    </div>
  )
}

export default Packing