"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from '@/components/ui/label';
import addressSchema from '@/schemas/addressSchema';
import { checkout } from '@/checkout';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

// Define the CartItem interface
interface CartItem {
    _id: string;
    productName: string;
    productPrice: number;
    productImage: string;
    productQty: number;
}

type FormSchema = z.infer<typeof addressSchema>;

function Page() {
    const [carts, setCarts] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [clickInSubmit, setClickInSubmit] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<FormSchema>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            street: '',
            landMark: '',
            city: '',
            state: '',
            pincode: '',
            mobileNo: '',
        },
    });

    const payment = async (data: FormSchema) => {
        console.log(JSON.stringify(data, null, 2));
        const address = JSON.stringify(data, null, 2);
        setClickInSubmit(true);
        try {
            const res = await axios.post('/api/create-new-order', {
                address,
                carts,

            });
            if (res.data.body === 'success') {
                toast({
                    title: 'Success',
                    description: 'Order created successfully',

                });
            } else {
                toast({
                    title: 'Error while creating order',
                    description: 'An error occurred while creating the order',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'An error occurred while creating the order',
                variant: 'destructive',
            });
        }
        finally {
            setClickInSubmit(false);
            router.push('/orders');
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
    const shipping = 50.00 * carts.length;
    const discount = gst;
    const grandTotal = totalAmount + gst + shipping - discount;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
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
                                <div className="mt-8 p-4 border-2 rounded-xl border-gray-200 lg:w-1/3 lg:ml-8">
                                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                                    <div className="flex flex-col space-y-2">
                                        <Label className="text-xl font-bold">Total Items: {carts.length}</Label>
                                        <Label className="text-xl font-bold">Total Quantity: {carts.reduce((total, cart) => total + cart.productQty, 0)}</Label>
                                        <Label className="text-xl font-bold">Total Price: ₹{totalAmount.toFixed(2)}</Label>
                                        <Label className="text-xl font-bold">GST: ₹{gst.toFixed(2)}</Label>
                                        <Label className="text-xl font-bold">Shipping: ₹{shipping.toFixed(2)}</Label>
                                        <Label className="text-xl font-bold">Discount: -₹{discount.toFixed(2)}</Label>
                                        <hr className="border-t border-gray-200" />
                                        <Label className="text-xl font-bold">Grand Total: ₹{grandTotal.toFixed(2)}</Label>
                                    </div>
                                </div>
                                <div className="mt-8 p-4 border-2 rounded-xl border-gray-200 lg:w-1/3 lg:ml-8">
                                    <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(payment)} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="street"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Street Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter your street name" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Please enter the street name of your address.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="landMark"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Landmark</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter your landmark" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Please enter the landmark of your address.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="city"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>City</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter your city" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Please enter your city.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="state"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>State</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter your state" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Please enter your state.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="pincode"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Pincode</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter your pincode" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Please enter your area's pincode.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="mobileNo"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Mobile Number</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter your mobile number" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Please enter your mobile number.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className='my-6 flex w-full justify-center'>
                                                <Button
                                                    type="submit"
                                                    className="bg-green-500 text-white my-10 px-6 py-2 rounded-lg hover:bg-green-700 transition"
                                                    disabled={clickInSubmit}
                                                >

                                                    {
                                                        clickInSubmit ?
                                                            <>
                                                                <Loader2 className="animate-spin h-5 w-5 mr-3" />
                                                                Processing...
                                                            </> :
                                                            <>
                                                                <Link href="https://buy.stripe.com/test_eVa3eMgTQ2hV7ao9AB" target='_blank' >
                                                                    <p>Place Order</p>
                                                                </Link>
                                                            </>
                                                    }
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
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
