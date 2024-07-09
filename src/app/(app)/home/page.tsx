"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/Interface/ProductInterface';

function Page() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const res = await axios.get('/api/get-all-products');
                setProducts(res.data.products);
                console.log(res.data.products);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className='flex flex-wrap gap-4 m-5'>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Page;
