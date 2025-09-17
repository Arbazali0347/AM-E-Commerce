import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import OrdersContextProvider from './context/ordersContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <OrdersContextProvider>
      <App />
    </OrdersContextProvider>
  </BrowserRouter>
)
