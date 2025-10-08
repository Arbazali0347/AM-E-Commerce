import React from "react";
import { currency } from "../App";

const OrderTable = ({ orders, statusHandler, onDelete, showStatus = true, showDelete = false }) => {
  return (
    <div className="overflow-x-auto">
      {/* 🖥️ Desktop / Laptop / Tablet view */}
      <table className="hidden sm:table min-w-full border border-gray-200 text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border w-[100px]">Order ID</th>
            <th className="px-4 py-2 border w-[150px]">Customer</th>
            <th className="px-4 py-2 border w-[120px]">City</th>
            <th className="px-4 py-2 border w-[200px]">Address</th>
            <th className="px-4 py-2 border w-[500px]">Items</th>
            <th className="px-4 py-2 border w-[100px]">Payment</th>
            <th className="px-4 py-2 border w-[100px]">Date</th>
            <th className="px-4 py-2 border w-[100px]">Amount</th>
            <th className="px-4 py-2 border w-[140px]">Status</th>
            {showDelete && <th className="px-4 py-2 border w-[100px]">Action</th>}
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {/* 🆔 Order ID */}
              <td className="px-4 py-2 border text-pink-700 font-medium whitespace-nowrap">
                #10{order.trackingId}
              </td>

              {/* 👤 Customer */}
              <td className="px-4 py-2 border whitespace-nowrap">
                {order.address.firstName} {order.address.lastName}
                <br />
                <span className="text-xs text-gray-500">{order.address.phone}</span>
              </td>

              {/* 🌆 City */}
              <td className="px-4 py-2 border max-w-[120px] overflow-x-auto whitespace-nowrap">
                <div className="inline-block">{order.address.city || "—"}</div>
              </td>

              {/* 🏠 Address */}
              <td className="px-4 py-2 border min-w-[250px]">
                <div className="inline-block">{order.address.address || "—"}</div>
              </td>

              {/* 🛍️ Items with flavors */}
              <td className="px-4 py-2 border max-w-[500px] overflow-x-auto min-w-[300px] ">
                <div className="inline-block">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="mb-2">
                      {/* Product Name */}
                      <div className="font-medium">{item.name}</div>

                      {/* Flavor List */}
                      {item.flavors && Object.keys(item.flavors).length > 0 ? (
                        <div className="ml-3 text-gray-600 text-xs">
                          {Object.entries(item.flavors).map(([flavor, qty]) => (
                            <div key={flavor}>
                              {flavor}: {qty}
                            </div>
                          ))}
                          <div className="font-medium mt-1">
                            Total: {item.totalQuantity} items
                          </div>
                        </div>
                      ) : (
                        // If no flavors — fallback
                        <div className="ml-3 text-gray-600 text-xs">
                          Quantity: {item.quantity}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </td>

              {/* 💳 Payment */}
              <td className="px-4 py-2 border whitespace-nowrap">
                {order.paymentMethod} <br />
                <span
                  className={
                    order.payment ? "text-green-600 text-xs" : "text-red-500 text-xs"
                  }
                >
                  {order.payment ? "Paid" : "Pending"}
                </span>
              </td>

              {/* 📅 Date */}
              <td className="px-4 py-2 border whitespace-nowrap">
                {new Date(order.date).toLocaleDateString()}
              </td>

              {/* 💰 Amount */}
              <td className="px-4 py-2 border whitespace-nowrap">
                {currency}
                {order.amount}
              </td>

              {/* 📌 Status */}
              <td className="px-4 py-2 border whitespace-nowrap">
                {showStatus ? (
                  <select
                    value={order.status}
                    onChange={(e) => statusHandler(e, order._id)}
                    className="p-1 border rounded"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                ) : (
                  <span>{order.status}</span>
                )}
              </td>

              {/* ❌ Delete */}
              {showDelete && (
                <td className="px-4 py-2 border text-center whitespace-nowrap">
                  <button
                    onClick={() => onDelete(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📱 Mobile View */}
      <div className="sm:hidden space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="border p-3 rounded shadow-sm text-sm">
            <p className="text-pink-700 font-medium">#10{order.trackingId}</p>
            <p>
              <strong>Customer:</strong> {order.address.firstName} {order.address.lastName} <br />
              <span className="text-xs text-gray-500">{order.address.phone}</span>
            </p>
            <p><strong>City:</strong> {order.address.city || "—"}</p>
            <p><strong>Address:</strong> {order.address.address || "—"}</p>

            {/* 🛍️ Mobile Items with Flavors */}
            <p>
              <strong>Items:</strong><br />
              {order.items.map((item, idx) => (
                <div key={idx} className="ml-2">
                  <div className="font-medium">{item.name}</div>
                  {item.flavors && Object.keys(item.flavors).length > 0 ? (
                    <div className="ml-2 text-xs">
                      {Object.entries(item.flavors).map(([flavor, qty]) => (
                        <div key={flavor}>
                          {flavor}: {qty}
                        </div>
                      ))}
                      <div className="font-medium mt-1">
                        Total: {item.totalQuantity} items
                      </div>
                    </div>
                  ) : (
                    <div className="ml-2 text-xs">
                      Quantity: {item.quantity}
                    </div>
                  )}
                </div>
              ))}
            </p>

            <p>
              <strong>Payment:</strong> {order.paymentMethod} –{" "}
              {order.payment ? (
                <span className="text-green-600">Paid</span>
              ) : (
                <span className="text-red-500">Pending</span>
              )}
            </p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Amount:</strong> {currency}{order.amount}</p>
            <p>
              <strong>Status:</strong>{" "}
              {showStatus ? (
                <select
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                  className="p-1 border rounded"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              ) : (
                order.status
              )}
            </p>

            {showDelete && (
              <button
                onClick={() => onDelete(order._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTable;
