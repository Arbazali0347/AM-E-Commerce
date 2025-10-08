import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "Rs.";
    const delivery_fee = 300;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");

    // ✅ addToCart without size
    // ✅ addToCart with flavor
    const addToCart = async (itemId, flavor) => {
        let cartData = structuredClone(cartItems);

        // Agar product ka object hi nahi hai, to bana do
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Flavor ka count update karo
        if (cartData[itemId][flavor]) {
            cartData[itemId][flavor] += 1;
        } else {
            cartData[itemId][flavor] = 1;
        }

        setCartItems(cartData);

        if (token) {
            setLoading(true);
            try {
                await axios.post(
                    backendUrl + "/api/cart/add",
                    { itemId, flavor }, // 👈 flavor bhi send
                    { headers: { token } }
                );
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
    };


    // ✅ count total items without size
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const flavor in cartItems[itemId]) {
                totalCount += cartItems[itemId][flavor];
            }
        }
        return totalCount;
    };

    // ✅ update quantity without size
    // ✅ update quantity with flavor
    const updateQuantity = async (itemId, flavor, quantity) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId] && cartData[itemId][flavor] !== undefined) {
            cartData[itemId][flavor] = quantity;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    { itemId, flavor, quantity }, // 👈 flavor bhi send
                    { headers: { token } }
                );
            } catch (error) {
                toast.error(error.message);
            }
        }
    };


    // ✅ get total cart amount with flavor
    const getCartAmount = () => {
        let totalAmount = 0;
        let hasPaidDelivery = false;

        for (const itemId in cartItems) {
            const itemInfo = products.find((p) => p._id === itemId);
            if (!itemInfo) continue;

            for (const flavor in cartItems[itemId]) {
                const qty = Number(cartItems[itemId][flavor] || 0);
                const price = Number(itemInfo.price || 0);

                if (qty > 0) {
                    totalAmount += price * qty;
                    if (!itemInfo.freeDelivery) {
                        hasPaidDelivery = true;
                    }
                }
            }
        }

        return {
            totalAmount,
            totalDelivery: hasPaidDelivery ? 300 : 0,
        };
    };



    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/product/list");
            if (data.success) {
                setProducts(data.products);
                setLoading(false)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/cart/get",
                {},
                { headers: { token } }
            );
            if (data.success) {
                setCartItems(data.cartData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken && !token) {
            setToken(savedToken);
            getUserCart(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        loading,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
