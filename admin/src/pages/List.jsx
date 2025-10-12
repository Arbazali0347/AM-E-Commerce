// src/pages/List.jsx
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const List = ({ token }) => {
  const [list, setList] = useState([])
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

      {/* 🧠 Table Header (Desktop only) */}
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
                      className="grid md:grid-cols-[0.5fr_1fr_3fr_1fr_1fr_1fr] grid-cols-1 md:items-center gap-2 p-3 border rounded bg-white cursor-grab relative"
                    >
                      {/* 🔢 Mobile Order Badge */}
                      <span className="md:hidden absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {index + 1}
                      </span>

                      {/* Index (Desktop Only) */}
                      <span className="hidden md:block text-center font-semibold">{index + 1}</span>

                      {/* Mobile Top Row (Image + Actions) */}
                      <div className="flex justify-between items-start md:hidden">
                        <div className="flex items-center gap-2">
                          <img className="w-16 h-16 object-cover rounded" src={item.image[0]} alt={item.name} />
                          <div>
                            <span className="font-semibold">{item.name}</span>
                            {item.bestseller && (
                              <span className="text-xs text-white bg-green-600 rounded px-1 ml-1">
                                🌟 Bestseller
                              </span>
                            )}
                            <p className="text-gray-600 text-sm">{item.category}</p>
                            <p className="text-red-700 font-semibold">{currency}{item.price}</p>
                          </div>
                        </div>
                        {/* Actions (Mobile) */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => navigate(`/update-product/${item._id}`)}
                            className="text-blue-600 text-lg"
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
                            className="text-red-600 text-lg"
                          >
                            ✖
                          </button>
                        </div>
                      </div>

                      {/* Desktop Columns */}
                      <img className="hidden md:block w-12 h-12 object-cover" src={item.image[0]} alt={item.name} />

                      <div className="hidden md:flex flex-col">
                        <span>{item.name}</span>
                        {item.bestseller && (
                          <span className="text-xs text-white bg-green-600 rounded px-1 mt-0.5 w-fit">
                            🌟 Bestseller
                          </span>
                        )}
                      </div>

                      <p className="hidden md:block">{item.category}</p>
                      <p className="hidden md:block">{currency}{item.price}</p>

                      <div className="hidden md:flex justify-end md:justify-center gap-3">
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
