import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Product } from '@/Interface/ProductInterface';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';

interface ProductCardProps {
	product: Product;
}

function trimString(str: string, length: number) {
	return str.length > length ? str.substring(0, length) + '...' : str;
}

function ProductCard({ product }: ProductCardProps) {
	const [onClickCart, setOnClickCart] = useState(false)
	const router = useRouter();
	const { toast } = useToast();
	const onClickHandle = async () => {
		try {
			setOnClickCart(true)
			const cart = await axios.post('/api/add-to-cart', { productId: product._id })

			if (cart.data.success) {
				toast({
					title: 'Product added to cart',
					description: 'Product added to cart successfully',
				})
				router.push(`/cart`);
			} else {
				toast({
					title: 'Product not added to cart',
					description: 'Product not added to cart',
					variant: 'destructive'
				})
			}

		} catch (error) {
			console.log(error);
			toast({
				title: 'Product not added to cart',
				description: 'Product not added to cart',
				variant: 'destructive'
			})
		} finally {
			setOnClickCart(false)
		}
	};
	return (
		<Card className='w-[350px]'>
			<div className='w-full flex items-center justify-center'>
				<div className='p-2 mt-4 rounded-lg bg-secondary-foreground'>
					<Image
						src={product.productImage}
						alt={product.productName}
						width={250}
						height={250}
					/>
				</div>
			</div>
			<CardHeader>
				<CardTitle>{product.productName}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{trimString(product.productDescription, 50)}</CardDescription>
			</CardContent>
			<CardFooter className='w-full flex justify-between'>
				<Label>₹ {product.productPrice}</Label>
				<Button
					onClick={onClickHandle}
					disabled={onClickCart}
				>
					{onClickCart ? <>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Please wait ...
					</> : 'Add to cart'}
				</Button>
			</CardFooter>
		</Card>
	);
}

export default ProductCard;
