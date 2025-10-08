import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        const flavors = cartItems[productId];
        for (const flavor in flavors) {
          const quantity = flavors[flavor];
          if (quantity > 0) {
            tempData.push({
              _id: productId,
              flavor,
              quantity
            });
          }
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-10 px-4 sm:px-8 lg:px-16'>
      {/* Heading */}
      <div className='text-center text-2xl sm:text-3xl font-semibold mb-6'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-6">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index} // flavor-wise unique key
              className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border rounded-2xl p-4 shadow-sm'
            >
              {/* Image */}
              <img
                className='w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl'
                src={productData.image[0]}
                alt={productData.name}
              />

              {/* Product Info */}
              <div className='flex-1 text-center sm:text-left'>
                <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                <p className='text-gray-600 mt-1'>{currency}{productData.price}</p>
                <p className='text-gray-500 mt-1 text-sm'>Flavor: <span className='font-medium'>{item.flavor}</span></p>
                {productData.freeDelivery ? (
                  <p className='text-green-600 text-sm mt-1 font-medium'>✅ Free Delivery</p>
                ) : (
                  <p className='text-red-500 text-sm mt-1 font-medium'>+ Delivery Fee</p>
                )}
              </div>

              {/* Quantity & Delete */}
              <div className='flex items-center gap-3'>
                <input
                  type="number"
                  className='border rounded-lg w-14 sm:w-16 px-2 py-1 text-center'
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value || 0);
                    if (val === 0) return;
                    updateQuantity(item._id, item.flavor, val); // flavor-wise update
                  }}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.flavor, 0)}
                  src={assets.bin_icon}
                  className='w-5 sm:w-6 cursor-pointer hover:scale-110 transition'
                  alt="delete"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total */}
      <div className='flex justify-center sm:justify-end mt-12'>
        <div className='w-full sm:w-[400px]'>
          <CartTotal />
          <div className='w-full text-center sm:text-right'>
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black hover:bg-gray-800 text-white text-sm sm:text-base my-6 px-6 py-3 rounded-xl transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
