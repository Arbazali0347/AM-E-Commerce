import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import OrdersContextProvider from './context/OrdersContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <OrdersContextProvider>
      <App />
    </OrdersContextProvider>
  </BrowserRouter>
)
