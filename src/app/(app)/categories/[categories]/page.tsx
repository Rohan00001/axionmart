"use client";

import ProductCard from '@/components/ProductCard';
import SideCategoryBar from '@/components/SideCategoryBar';
import { Product } from '@/Interface/ProductInterface';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Page({ params }: any) {
    const category = params.categories;

    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/get-product-by-category?category=${category}`);
                setTimeout(() => {
                    setProducts(res.data.products);
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className='flex flex-row min-h-screen'>
            <SideCategoryBar />
            {
                loading ?
                    <div className='flex w-full h-screen items-center justify-center flex-col flex-1 p-4'>
                        <Image src='/bouncing-circles.svg' alt='loading' width={200} height={200} />
                    </div>
                    :
                    <div className='flex flex-wrap flex-1 p-4 gap-4'>
                        {products.length > 0 ? products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        )) :
                            <div className='flex w-full h-screen items-center justify-center flex-col flex-1 p-4'>
                                <h1 className='text-2xl font-bold'>No products found in this category</h1>
                            </div>
                        }
                    </div>
            }
        </div>
    );
}

export default Page;
