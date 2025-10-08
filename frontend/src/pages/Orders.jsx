import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // 🧠 Load all orders from backend for the logged-in user
  const loadOrdersData = async () => {
    try {
      if (!token) return;

      const { data } = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (data.success) {
        let allOrdersItem = [];

        // 🧠 Flatten orders: take each order and push its items with order info
        data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["paymentMethod"] = order.paymentMethod;
            item["payment"] = order.payment;
            item["date"] = order.date;
            item["trackingId"] = order.trackingId;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrdersData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            {/* ---------- Product Info Section ---------- */}
            <div className='flex items-start gap-6 text-sm'>
              <img
                src={item.image?.[0] || "/placeholder.jpg"}
                alt={item.name || "Product"}
                className='w-16 sm:w-20 object-cover rounded'
              />
              <div>
                {/* 🔸 Tracking ID */}
                <p className='text-pink-700'>
                  Tracking ID: #10{item.trackingId}
                </p>

                {/* 🔸 Product Name */}
                <p className='sm:text-base font-medium'>{item.name}</p>

                {/* 🔸 Price Section */}
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  {item.oldPrice && (
                    <p className="text-gray-500 text-xs sm:text-sm line-through">
                      {currency}{item.oldPrice}
                    </p>
                  )}
                  <p className="text-red-700">{currency}{item.price}</p>
                </div>

                {/* 🧠 Flavor Quantity Section */}
                <div className='mt-1 text-sm text-gray-700'>
                  {
                    // Agar flavors exist karte hain to loop lagake show karo
                    item.flavors && Object.keys(item.flavors).length > 0 && (
                      <div>
                        {Object.entries(item.flavors).map(([flavor, qty]) => (
                          <p key={flavor}>
                            {flavor}: {qty}
                          </p>
                        ))}
                        <p className='font-medium'>
                          Total: {item.totalQuantity} items
                        </p>
                      </div>
                    )
                  }
                </div>

                {/* 🔸 Date & Payment Method */}
                <p className='mt-1'>
                  Date: <span className='text-gray-400'>
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className='mt-1'>
                  Payment: <span className='text-gray-400'>
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>

            {/* ---------- Right Side: Status + Track Button ---------- */}
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button
                onClick={loadOrdersData}
                className='border px-4 py-2 text-sm font-medium rounded-sm'
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
