"use client";
import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios';
import { useToast } from './ui/use-toast';

function Navbar() {
    const pathName = usePathname()
    const { toast } = useToast()

    const logoutFunc = async () => {
        try {
            const response = await axios.post('/api/sign-out')
            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: 'User signed out successfully',
                })
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/home"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        <div className="z-10 h-10 w-10">
                            <Image src="/logo.png" width={60} height={60} alt="Logo" />
                        </div>
                    </Link>
                    <Link
                        href="/categories/clothing"
                        className={`${pathName == '/categories/clothing' ? "text-white" : ""} text-muted-foreground transition-colors hover:text-foreground`}
                        passHref
                    >
                        <p>
                            Categories
                        </p>
                    </Link>
                    <Link
                        href="/orders"
                        className={`${pathName == '/orders' ? "text-white" : ""} text-muted-foreground transition-colors hover:text-foreground`}
                    >
                        Orders
                    </Link>
                    <Link
                        href="/your-products"
                        className={`${pathName == '/your-products' ? "text-white" : ""} text-muted-foreground transition-colors hover:text-foreground`}
                    >
                        Your Products
                    </Link>

                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/home"
                                className="text-foreground transition-colors hover:text-foreground"
                            >
                                <div className="z-10 h-10 w-10">
                                    <Image src="/logo.png" width={60} height={60} alt="Logo" />
                                </div>
                            </Link>
                            <Link href="/categories/clothing" className="hover:text-foreground">
                                Catagories
                            </Link>
                            <Link
                                href="/orders"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                href="/your-products"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Your Products
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <Link href="/cart" className="flex items-center gap-2">
                        <Package2 className="h-6 w-6" />
                        <span className="hidden md:inline">Cart</span>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/create-new-product">Create Product</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={logoutFunc}
                            >Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </div>
    )
}

export default Navbar