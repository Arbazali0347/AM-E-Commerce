import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import OrdersNav from './OrdersNav'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'
import Loading from './Loading'
import { ordersContext } from '../context/OrdersContext'
import OrderCard from './OrderCard'
import OrderTable from './OrderCard'

const OutOfDelivery = () => {
    const [outOfDelivryOrders, setOutOfDelivryOrders] = useState([])
    const { orders, fetchAllOrders, token, loading } = useContext(ordersContext);

    const fetch_OutOfDelivryOrders = async () => {
        if (!token) {
            return null;
        }
        try {
            const filtered = orders.filter(order => order.status === "Out for delivery");
            setOutOfDelivryOrders(filtered);
        } catch (error) {
            toast.error(error.message)
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } })
            if (data.success) {
                await fetchAllOrders();
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetch_OutOfDelivryOrders();
    }, [token, orders])
    return (
        (
            <div>
                <OrdersNav />
                <h1 className="text-xl font-semibold mb-4">Out for Delivery</h1>
                <div>
                    {loading ? <Loading /> : (
                        <OrderTable
                            orders={outOfDelivryOrders}
                            statusHandler={statusHandler}
                            showStatus={true}  // admin side me dropdown hoga
                        />
                    )}
                </div>
            </div>
        ))
}

export default OutOfDelivery;