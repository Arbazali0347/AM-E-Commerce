import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Login from './components/Login'
import {ToastContainer} from "react-toastify"
import CompleteOrders from './components/CompleteOrders'
import Packing from './components/Packing'
import Delivered from './components/Delivered'
import Orders from './pages/Orders'
import OutOfDelivery from './components/OutOfDelivery'
import Shipping from './components/Shipping'
import BulkDealsAdmin from './pages/BulkDeal'
import UpdateProduct from './components/UpdateProduct'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "Rs."
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"")

  useEffect(() => {
    localStorage.setItem("token",token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token}/>} />
                <Route path="/update-product/:id" element={<UpdateProduct token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='/delivered' element={<Delivered token={token}/>} />
                <Route path='/packing' element={<Packing token={token}/>} />
                <Route path='/placed' element={<CompleteOrders token={token} />} /> 
                <Route path='/out-of-delivery' element={<OutOfDelivery token={token} />} /> 
                <Route path='/shipping' element={<Shipping token={token} />} /> 
                <Route path='/bulk-deals' element={<BulkDealsAdmin token={token} />} /> 
                {/* it is my mistake I did not change the name of complete into the placed */}
              </Routes>
            </div>
          </div>
        </>
      }

    </div>
  )
}

export default App