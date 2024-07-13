"use client";
import axios from 'axios';
import Image from 'next/image';
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
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function Page() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { toast } = useToast();

    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            try {
                const res = await axios.get('/api/get-orders');
                if (res.data.success) {
                    setOrders(res.data.orders);
                    console.log(res.data.orders);
                }
            } catch (error) {
                console.error('Error while fetching orders:', error);
                toast({
                    title: "Error",
                    description: "Failed to fetch orders.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    return (
        <div className="p-4">
            {loading ? (
                <div className="flex justify-center w-full items-center h-64">
                    <Image src="/bouncing-circles.svg" alt="Loading..." width={100} height={100} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order: any) => (
                        <Card key={order._id} className="w-full">
                            <CardHeader>
                                <CardTitle>Order #{order._id}</CardTitle>
                                <CardDescription>
                                    <div className=" mt-4 flex justify-start items-start flex-col space-y-4">
                                        <Label>Status: {order.orderStatus}</Label>

                                        <Label>Payment Method: {order.paymentMethod}</Label>
                                        <Label>Total: ₹{order.totalPrice}</Label>


                                        <Label>Paid At: {order.paidAt}</Label>
                                        <Label>Delivered At: will be informed </Label>

                                        <div className="flex space-x-2">
                                            <Button>Track Order</Button>
                                            <Button variant="secondary">Cancel Order</Button>
                                        </div>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {order.items.map((item: any) => (
                                    <div key={item._id} className="flex items-start space-x-4 mb-4">
                                        <Image
                                            src={item.productDetails.productImage}
                                            alt={item.productDetails.productName}
                                            width={50}
                                            height={50}
                                            className="rounded-md"
                                        />
                                        <div>
                                            <Label>{item.productDetails.productName}</Label>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ₹{item.itemPrice}</p>
                                            <p>Shipping: ₹{item.shippingPrice}</p>
                                            <p>Total: ₹{item.totalPrice}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <div className="space-y-2">
                                    <Label>Shipping Address:</Label>
                                    <pre className="bg-secondary p-2 rounded-md overflow-x-auto">
                                        {JSON.stringify(JSON.parse(order.shippingAddress), null, 2)
                                            .replace(/"/g, '')
                                            .replace(/,/g, '')
                                            .split('\n').map((line, index) => (
                                                <span key={index}>
                                                    {line}
                                                    <br />
                                                </span>
                                            ))
                                        }
                                    </pre>

                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Page;
