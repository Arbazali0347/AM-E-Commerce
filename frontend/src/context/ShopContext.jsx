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
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");

    // ✅ addToCart without size
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);

        if (token) {
            setLoading(true);
            try {
                await axios.post(
                    backendUrl + "/api/cart/add",
                    { itemId }, // 👈 size remove
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
            if (cartItems[itemId] > 0) {
                totalCount += cartItems[itemId];
            }
        }
        return totalCount;
    };

    // ✅ update quantity without size
    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + "/api/cart/update",
                    { itemId, quantity }, // 👈 size remove
                    { headers: { token } }
                );
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    // ✅ get total cart amount without size
const getCartAmount = () => {
  let totalAmount = 0;
  let totalDelivery = 0;
  let hasPaidDelivery = false; // track karenge koi item freeDelivery nahi hai kya

  for (const itemId in cartItems) {
    const itemInfo = products.find((p) => p._id === itemId);
    if (!itemInfo) continue;

    const qty = Number(cartItems[itemId] || 0);
    const price = Number(itemInfo.price || 0);

    if (qty > 0) {
      // product ka price
      totalAmount += price * qty;

      // check agar freeDelivery nahi hai
      if (!itemInfo.freeDelivery) {
        hasPaidDelivery = true;
      }
    }
  }

  // sirf ek hi dafa 300 charge hoga agar koi item freeDelivery wala na ho
  if (hasPaidDelivery) {
    totalDelivery = 300;
  }

  return { totalAmount, totalDelivery };
};


    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/product/list");
            if (data.success) {
                setProducts(data.products);
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
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"));
        }
    }, []);

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
