"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Define the CartItem interface
interface CartItem {
    _id: string;
    productName: string;
    productPrice: number;
    productImage: string;
    productQty: number;
}

function Page() {
    const [carts, setCarts] = useState<CartItem[]>([]);

    const deleteCartItem = async (cartId: string) => {
        try {
            const res = await axios.delete('/api/delete-cart-item', { data: { cartId } });
            console.log(res.data);
            if (res.data.success) {
                setCarts(carts.filter((cart) => cart._id !== cartId));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const res = await axios.get('/api/get-cart');
                setCarts(res.data.body);
                console.log(res.data.body);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCarts();
    }, []);

    const totalAmount = carts.reduce((total, cart) => total + (cart.productPrice * cart.productQty), 0);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {carts.map((cart) => (
                    <Card key={cart._id} className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">{cart.productName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                <Image src={cart.productImage} alt={cart.productName} width={300} height={300} className="w-full h-48 object-cover mb-4 rounded-md" />
                                <Label>Price: ₹{cart.productPrice.toFixed(2)}</Label>
                            </CardDescription>
                            <CardDescription>
                                <Label>Quantity: {cart.productQty}</Label>
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <Label className="font-bold">Total: ₹{(cart.productPrice * cart.productQty).toFixed(2)}</Label>
                            <Button
                                onClick={() => deleteCartItem(cart._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition">Remove</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="mt-8 p-4 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                <div className="flex justify-between items-center">
                    <Label className="text-xl font-bold">Total Amount: ₹{totalAmount.toFixed(2)}</Label>
                    <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition">Proceed to Checkout</Button>
                </div>
            </div>
        </div>
    );
}

export default Page;
