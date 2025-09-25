import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contect from './pages/Contect'
import Product from './pages/Product'

import Login from './pages/Login'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import PlaceOrder from './pages/PlaceOrder'
import Cart from './pages/Cart'
import WhatsAppButton from './components/Whatsbottom'
import Delivery from './components/Delivery'
import Policy from './components/Policy'
import BulkDeal from './pages/BulkDeal'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contect' element={<Contect/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/delivery' element={<Delivery/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path="/bulk-dealing" element={<BulkDeal />} />
      </Routes>
      <Footer/>
      <WhatsAppButton/>
    </div>
  )
}

export default App;