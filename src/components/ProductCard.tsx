import React from 'react';
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

interface ProductCardProps {
	product: Product;
}

function trimString(str: string, length: number) {
	return str.length > length ? str.substring(0, length) + '...' : str;
}

function ProductCard({ product }: ProductCardProps) {
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
				<Button>Buy</Button>
			</CardFooter>
		</Card>
	);
}

export default ProductCard;
