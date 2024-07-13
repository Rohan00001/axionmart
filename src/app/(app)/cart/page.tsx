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
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    const { toast } = useToast();
    const router = useRouter();

    const deleteCartItem = async (cartId: string) => {
        try {
            setDeleting(cartId);
            const res = await axios.delete('/api/delete-cart-item/', {
                data: { cartId },
            });

            if (res.data.success) {
                toast({
                    title: 'Cart item deleted',
                    description: 'Cart item deleted successfully',
                });
                setCarts(carts.filter((cart) => cart._id !== cartId));
            } else {
                toast({
                    title: 'Cart item not deleted',
                    description: 'Cart item not deleted',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'An error occurred while deleting the cart item',
                variant: 'destructive',
            });
        } finally {
            setDeleting(null);
        }
    };

    const checkout = async () => {
        router.push('/checkout');
    }

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const res = await axios.get('/api/get-cart');
                setCarts(res.data.body);
            } catch (error) {
                console.log(error);
                toast({
                    title: 'Error',
                    description: 'An error occurred while fetching the cart items',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchCarts();
    }, [toast]);

    const totalAmount = carts.reduce((total, cart) => total + (cart.productPrice * cart.productQty), 0);
    const gst = totalAmount * 0.18;
    const shipping = 50.00;
    const discount = gst;
    const grandTotal = totalAmount + gst + shipping - discount;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>
            <div className="flex flex-col lg:flex-row lg:justify-between">
                {loading ? (
                    <div className="flex justify-center w-full items-center h-64">
                        <Image src="/bouncing-circles.svg" alt="Loading" width={100} height={100} />
                    </div>
                ) : (
                    <>
                        {carts.length === 0 ? (
                            <div className="text-center text-xl font-semibold">No items in the cart</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:w-2/3">
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
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                                    disabled={deleting === cart._id}>
                                                    {
                                                        deleting === cart._id ?
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Deleting...
                                                            </> :
                                                            'Delete'
                                                    }
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                                <div className="mt-8 p-4 border-2 rounded-xl border-gray-200 lg:w-1/3 lg:ml-8">
                                    <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                                    <div className="flex flex-col space-y-2">
                                        <Label className="text-xl font-bold">Total Items: {carts.length}</Label>
                                        <Label className="text-xl font-bold">Total Quantity: {carts.reduce((total, cart) => total + cart.productQty, 0)}</Label>
                                        <Label className="text-xl font-bold">Total Price: ₹{totalAmount.toFixed(2)}</Label>
                                        <Label className="text-xl font-bold">GST: ₹{gst.toFixed(2)}</Label>
                                        <Label className="text-xl font-bold">Shipping: ₹{shipping.toFixed(2)}</Label>
                                        <Label className="text-xl font-bold">Discount: -₹{discount.toFixed(2)}</Label>
                                        <hr className="border-t border-gray-200" />
                                        <Label className="text-xl font-bold">Grand Total: ₹{grandTotal.toFixed(2)}</Label>
                                        <div className='my-6 flex w-full justify-center'>
                                            <Button
                                                onClick={checkout}
                                                className="bg-green-500 text-white my-10 px-6 py-2 rounded-lg hover:bg-green-700 transition">Proceed to Checkout</Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                    </>
                )}
            </div>
        </div>
    );
}

export default Page;
