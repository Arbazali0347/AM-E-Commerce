// src/admin/BulkDealsAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

export default function BulkDealsAdmin() {
  const [deals, setDeals] = useState([]);
  const BACKEND = backendUrl;

  useEffect(() => {
    fetchDeals();
  }, []);

  // Get all deals
  const fetchDeals = async () => {
    try {
      const res = await axios.get(`${BACKEND}/api/bulk-deals`, {
        headers: { token: localStorage.getItem("token") },
      });
      setDeals(res.data.data || []);
    } catch (err) {
      console.error("Fetch Deals Error:", err);
    }
  };

  // Update status
  const deleteBulk = async (id) => {
    const confirm = window.confirm("Are sure do you want to close it!")
    if(!confirm){
      return
    }
    try {
      console.log(id)
      const {data} = await axios.post(
        `${BACKEND}/api/bulk-deals/${id}`,
        {id},
        { headers: { token: localStorage.getItem("token") } }
      );
      if(data.success){
        toast.success("Bulk delete successfully!")
        fetchDeals();
      }else{
        toast.error(data.message)
      }
      // Refresh data after update
    } catch (err) {
      toast.error("Update Status Error:", err);
    }
  };

  // Open WhatsApp
  const openWhatsApp = (phone) => {
    const raw = phone.replace(/\D/g, ""); // remove all non-digits
    window.open(`https://wa.me/${raw}`, "_blank");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Bulk Inquiries</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((d) => (
              <tr
                key={d._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="p-2">{d.name}</td>
                <td className="p-2">{d.phone}</td>
                <td className="p-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => openWhatsApp(d.phone)}
                    className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer text-sm sm:text-base"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => deleteBulk(d._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer text-sm sm:text-base"
                  >
                    Close
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-3 mt-4 md:hidden">
        {deals.map((d) => (
          <div
            key={d._id}
            className="bg-white shadow rounded-lg p-3 flex flex-col gap-2"
          >
            <div>
              <span className="font-medium">Name:</span> {d.name}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {d.phone}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openWhatsApp(d.phone)}
                className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer text-sm"
              >
                WhatsApp
              </button>
              <button
                onClick={() => deleteBulk(d._id)}
                className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
