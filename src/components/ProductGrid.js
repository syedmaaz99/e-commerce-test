
import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ProductCard from './ProductCard';
import _ from 'lodash';
import { useSprings, animated } from '@react-spring/web';

const fetchProducts = async () => {
    const { data } = await axios.get('https://fakestoreapi.com/products');
    return data;
};

const ProductGrid = () => {
    const { data: products, error } = useQuery('products', fetchProducts, {
        suspense: true,
    });
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = useMemo(() => {
        return (products || []).filter(product => {
            const matchesCategory =
                selectedCategory === 'all' || product.category === selectedCategory;
            const matchesSearch = product.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchQuery]);

    const handleSearch = useMemo(() => _.debounce((query) => {
        setSearchQuery(query);
    }, 300), []);

    const handleSearchInput = (e) => {
        handleSearch(e.target.value);
    };

    const springs = useSprings(
        filteredProducts.length,
        filteredProducts.map((_, index) => ({
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0px)' },
            delay: index * 50,
        }))
    );


    if (error) return <div>Error loading products.</div>;

    return (
        <div className="p-4">
            <div className="mb-4">
                <label htmlFor="category" className="mr-2 font-semibold">Filter by Category:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-md p-2"
                >
                    <option value="all">All</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelry</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    onChange={handleSearchInput}
                    className="border rounded-md p-2 w-full"
                />
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {springs.map((spring, index) => (
                    <animated.div style={spring} key={filteredProducts[index].id}>
                        <ProductCard product={filteredProducts[index]} />
                    </animated.div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
