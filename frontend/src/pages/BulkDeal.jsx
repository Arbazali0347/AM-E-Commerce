// src/pages/BulkDeal.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

export default function BulkDeal() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const { token, backendUrl } = useContext(ShopContext);
  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!token) {
      toast.error("Please login first");
      return; // 🚫 request hi mat bhejna
    }
    if (!form.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!form.phone.trim()) {
      toast.error("Phone number is required (e.g. 92300...)");
      return false;
    }
    return true;
  };

  const saveRequest = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      await axios.post(`${backendUrl}/api/bulk-deals`, form, { headers: { token } });
      setForm({ name: "", phone: "" });
      toast.success("Request saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Server error. Try later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveRequest();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Bulk Dealing Inquiry</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Phone * (include country code)
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="92300xxxxxxx"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Sending..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
