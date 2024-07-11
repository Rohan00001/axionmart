"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function page({ params }: any) {
    const [productDetails, setProductDetails] = useState<any>({})

    console.log(params.cartId)

    useEffect(() => {
        async function getProductDetails() {
            try {
                const product = await axios.get('/api/get-product-by-id')
                setProductDetails(product.data.body)
                console.log(product.data.body)
            } catch (error) {

            }
        }
        getProductDetails()
    }, [])
    return (
        <div>page</div>
    )
}

export default page