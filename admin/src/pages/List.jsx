import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import UpdateProduct from '../components/UpdateProduct' // 👈 naya component import
import { useNavigate } from "react-router-dom";

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [editingId, setEditingId] = useState(null) // 👈 track edit product
  const navigate = useNavigate()

  const fetchList = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/product/list')
      if (data.success) {
        setList(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    const confirm = window.confirm('Are you sure to remove this product?')
    if (!confirm) return
    try {
      const { data } = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        fetchList()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Products List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <div className="flex justify-end md:justify-center gap-3">
              <button
                onClick={() => navigate(`/update-product/${item._id}`)} // 👈 navigate karega update page pe
                className="text-blue-600"
              >
                ✎
              </button>

              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-600"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Product Modal */}
      {editingId && (
        <UpdateProduct
          productId={editingId}
          token={token}
          onClose={() => setEditingId(null)}
          onUpdated={fetchList}
        />
      )}
    </>
  )
}

export default List
