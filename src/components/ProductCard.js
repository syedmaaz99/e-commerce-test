
import React from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../state/cartState';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const [cart, setCart] = useRecoilState(cartState);

    const addToCart = () => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            toast.info(`Item added`, { autoClose: 2000 });
            if (existingItem) {

                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <div className="border rounded-lg shadow-lg p-4">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-700">${product.price}</p>
            <button onClick={addToCart} className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md w-full">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
