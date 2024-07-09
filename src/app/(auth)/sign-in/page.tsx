'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function SignInForm() {
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const { toast } = useToast();
    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsButtonLoading(true);
        try {
            const response = await axios.post('/api/sign-in', data,
                { withCredentials: true }
            );

            console.log(response);

            if (response.data.success) {
                toast({
                    title: 'Sign in successful',
                    description: 'You have successfully signed in',
                });
                router.push('/home');
            } else {
                toast({
                    title: 'Sign in failed',
                    description: 'Invalid username or password',
                    variant: 'destructive'
                });
            }

        } catch (error) {
            toast({
                title: 'Sign in failed',
                description: 'Invalid username or password',
                variant: 'destructive'
            });

        } finally {
            setIsButtonLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-primary-foreground">
            <div className="w-full max-w-md p-8 space-y-8 border-2 border-secondary-foreground rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Axionmart
                    </h1>
                    <p className="mb-4">Sign in to continue shopping</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="identifier"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full' disabled={isButtonLoading}>
                            {isButtonLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Not a member yet?{' '}
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}