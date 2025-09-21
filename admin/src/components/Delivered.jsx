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

const Delivered = () => {

  const [deliveredOrders, setDeliveredOrders] = useState([])
  const { orders, fetchAllOrders, token, loading } = useContext(ordersContext);

  const fetchDeliveredOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const filtered = orders.filter(order => order.status === "Delivered").reverse();
      setDeliveredOrders(filtered);
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

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;
    try {
       const { data } = await axios.post(`${backendUrl}/api/order/${id}`,{id}, {headers: { token }});
      if(data.success){
        toast.success("Order deleted successfully!");
        fetchAllOrders();
        fetchDeliveredOrders();
      }else{
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchDeliveredOrders();
  }, [token, orders])
  return (
    <div>
      <OrdersNav />
      <h1>Delivered</h1>
      <div>
        {loading ? <Loading /> : (
          <OrderTable
            orders={deliveredOrders}
            statusHandler={statusHandler}
            showStatus={true}  // admin side me dropdown hoga
            showDelete={true}   // delete button enable
            onDelete={deleteOrder}
          />
        )}
      </div>
    </div>

  )
}

export default Delivered