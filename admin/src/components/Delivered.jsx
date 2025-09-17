import React, { useContext } from 'react'
import OrdersNav from './OrdersNav'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'
import Loading from './Loading'
import { ordersContext } from '../context/ordersContext'

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
        {loading ? (
          <Loading />
        ) : (
          deliveredOrders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-2xl shadow-sm"
            >
              <img className="w-12" src={assets.parcel_icon} alt="" />

              <div>
                <div>
                  {order.items?.map((item, itemIdx) => {
                    return (
                      <p className="py-0.5" key={`${index}-${itemIdx}`}>
                        {item.name} x Quantity: {item.quantity ?? item.quanitity} -{" "}
                        <span>{item.size} </span>
                      </p>
                    );
                  })}
                </div>

                <p className="mt-3 mb-2 font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipCode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              <div>
                <p className="text-sm sm:text-[15px]">
                  Items : {order.items.length}
                </p>
                <p className="mt-3">Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <p className="text-sm sm:text-[15px]">
                {currency}
                {order.amount}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="p-2 font-semibold border rounded-lg"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

                {/* ✅ Delete Button */}
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="px-4 py-2 bg-red-500 text-white text-sm 
                             font-semibold rounded-xl shadow-md 
                             hover:bg-red-600 active:scale-95 transition">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

  )
}

export default Delivered