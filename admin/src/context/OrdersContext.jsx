import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"
import { backendUrl } from '../App';
export const ordersContext = React.createContext();

const OrdersContextProvider = ({children}) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")
    const fetchAllOrders = async () => {
        if (!token) {
            return null;
        }
        try {
            const { data } = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } })
            if (data.success) {
                setOrders(data.orders.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [token])

    const value = { orders, setOrders, fetchAllOrders, token, setToken, loading }
    return (
        <ordersContext.Provider value={value}>
            {children}
        </ordersContext.Provider>
    )
}

export default OrdersContextProvider;