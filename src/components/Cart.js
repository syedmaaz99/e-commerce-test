// src/components/Cart.js
import React from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/cartAtom';
import { toast } from 'react-toastify';  // Import toast
import { motion, AnimatePresence } from 'framer-motion';  // Import Framer Motion

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  // Handle item removal
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.error("Item removed from cart", { autoClose: 2000 });  // Notification when item is removed
  };

  // Handle quantity adjustment
  const updateQuantity = (id, newQuantity) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    toast.info(`Quantity updated to ${newQuantity}`, { autoClose: 2000 });  // Notification when quantity is updated
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div>
      <h2 className="text-2xl font-semibold my-2">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}  // Initial state (start off-screen)
                  animate={{ opacity: 1, y: 0 }}  // Animate to normal position
                  exit={{ opacity: 0, y: 10 }}  // Exit animation (move off-screen)
                  transition={{ duration: 0.3 }}  // Transition duration
                  className="flex justify-between items-center mb-4 rounded-md bg-slate-300 p-3"
                >
                  <div>
                    <p>{item.title} - ${item.price}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Remove
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-4">
            <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
