import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import UpdateProduct from '../components/UpdateProduct'
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()

  // 🧠 Fetch Product List
  const fetchList = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/product/list')
      if (data.success) {
        const sorted = [...data.products].sort((a, b) => a.order - b.order)
        setList(sorted)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // 🧠 Handle Drag End
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const newList = Array.from(list)
    const [movedItem] = newList.splice(result.source.index, 1)
    newList.splice(result.destination.index, 0, movedItem)

    // 📝 Reset order numbers based on new positions
    const updatedList = newList.map((item, index) => ({
      ...item,
      order: index + 1
    }))

    setList(updatedList)
  }

  // 💾 Save Order to backend
  const saveOrder = async () => {
    try {
      const orderData = list.map(item => ({ id: item._id, order: item.order }))
      const { data } = await axios.post(
        `${backendUrl}/api/product/reorder`,
        { orders: orderData },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('✅ Order updated successfully!')
        fetchList()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('❌ Failed to update order')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <p className='text-lg font-semibold'>All Products List (Drag & Drop Reorder)</p>
        <button
          onClick={saveOrder}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          💾 Save Order
        </button>
      </div>

      {/* 🧠 Table Header */}
      <div className="hidden md:grid grid-cols-[0.5fr_1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-bold">
        <b>#</b>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="products">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-2">
              {list.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="grid grid-cols-[0.5fr_1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border rounded bg-white cursor-grab"
                    >
                      {/* Index */}
                      <span className="text-center font-semibold">{index + 1}</span>

                      {/* Image */}
                      <img className="w-12" src={item.image[0]} alt={item.name} />

                      {/* Name + Bestseller */}
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        {item.bestseller && (
                          <span className="text-xs text-white bg-green-600 rounded px-1 mt-0.5 w-fit">
                            🌟 Bestseller
                          </span>
                        )}
                      </div>

                      {/* Category */}
                      <p>{item.category}</p>

                      {/* Price */}
                      <p>{currency}{item.price}</p>

                      {/* Actions */}
                      <div className="flex justify-end md:justify-center gap-3">
                        <button
                          onClick={() => navigate(`/update-product/${item._id}`)}
                          className="text-blue-600"
                        >
                          ✎
                        </button>
                        <button
                          onClick={async () => {
                            const confirmDelete = window.confirm('Are you sure to remove this product?')
                            if (!confirmDelete) return
                            try {
                              const { data } = await axios.post(
                                backendUrl + '/api/product/remove',
                                { id: item._id },
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
                          }}
                          className="text-red-600"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default List
