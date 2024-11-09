
import React from 'react';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <ProductGrid />
                </div>
                <div className="md:col-span-1">
                    <Cart />
                </div>
            </div>
        </div>
    );
};

export default Home;
