import React, { useContext, useEffect, useState } from 'react'
import OrdersNav from './OrdersNav'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'
import Loading from './Loading'
import { ordersContext } from '../context/OrdersContext'

const Packing = () => {
  const {orders, fetchAllOrders, token, loading} = useContext(ordersContext);
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
        {loading ? (
          <Loading />
        ) : (
          packingOrders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <img className="w-12" src={assets.parcel_icon} alt="parcel icon" />

              {/* Order Details */}
              <div>
                <div>
                  {order.items?.map((item, itemIdx) => (
                    <p className="py-0.5" key={`${index}-${itemIdx}`}>
                      {item.name} x Quantity: {item.quantity ?? item.quanitity} -{" "}
                      <span>{item.size}</span>
                    </p>
                  ))}
                </div>

                <p className="mt-3 mb-2 font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>

                <div>
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              {/* Payment & Meta */}
              <div>
                <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
                <p className="mt-3">Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done ✅" : "Pending ⏳"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Price */}
              <p className="text-sm sm:text-[15px] font-medium">
                {currency}{order.amount}
              </p>

              {/* Status Select */}
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 font-semibold rounded-lg border"
              >
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

export default Packing