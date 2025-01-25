'use client'

import { useCart } from '@/helpers/context/CartContext'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductItemProps {
	product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
	const [quantity, setQuantity] = useState(1)
	const { addToCart } = useCart()

	const handleAddToCart = () => {
		addToCart(product, quantity)
		console.log(`${product.name} added to cart!`)
	}

	return (
		<div className='max-w-full p-4'>
			<h1 className='text-2xl font-bold mb-4'>{product.name}</h1>
			<div className='grid sm:grid-cols-12 xl:grid-cols-24 gap-4 items-center'>
				{/* images gallery*/}
				<div className='flex flex-row justify-center gap-2 sm:mb-10 sm:flex-col sm:col-start-1 sm:col-end-2'>
					{product.images.map((img, index) => (
						<div
							key={index}
							className='relative w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg cursor-pointer hover:border-gray-800 transition'
						>
							<Image
								src={img}
								alt={`Thumbnail ${index}`}
								width={42}
								height={42}
								className='h-4/5'
							/>
						</div>
					))}
				</div>

				{/* main img */}
				<div className='relative sm:col-start-3 sm:col-end-10 flex justify-center items-center h-96 border rounded-lg sm:h-[464px] mb-4'>
					<Image
						src={product.images[0]}
						alt='Main product image'
						fill
						className='h-full w-full object-cover object-center'
					/>
				</div>

				{/* product details */}
				<div className='sm:col-start-11 sm:col-end-20 space-y-6'>
					<div>
						<p className='text-sm text-gray-500 mb-1'>Available Colors</p>
						<div className='flex space-x-2'>
							{product.colorsAvailable.map((color, index) => (
								<div
									key={index}
									className='w-8 h-8 rounded-full border hover:border-gray-800 transition'
									style={{ backgroundColor: color }}
								></div>
							))}
						</div>
					</div>
					{/* line */}
					<div className='w-full mb-4 border-t border-gray-300'></div>

					{/* quantity */}
					<div className='flex items-center mb-4'>
						<label htmlFor='quantity' className='mr-4'>
							Quantity:
						</label>
						<input
							type='number'
							id='quantity'
							value={quantity}
							min={1}
							onChange={e => setQuantity(Number(e.target.value))}
							className='w-16 border border-gray-300 rounded-lg text-center'
						/>
					</div>
					{/* line */}
					<div className='w-full mb-4 border-t border-gray-300'></div>

					<div>
						<p className='text-lg font-bold'>{product.price}$</p>
					</div>
					{/* btns */}
					<div className='flex space-x-4'>
						<button
							onClick={handleAddToCart}
							className='px-4 py-2 w-full text-center bg-green-600 text-white rounded-lg hover:bg-green-700'
						>
							Add to Cart
						</button>
						<Link
							href='/checkout'
							className='px-4 py-2 w-full text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700'
						>
							Buy Now
						</Link>
					</div>
					<div className='space-y-2'>
						<div className='flex justify-between'>
							<p className='text-sm text-gray-500'>Category</p>
							<p>{product.category}</p>
						</div>
						<div className='flex justify-between'>
							<p className='text-sm text-gray-500'>Type</p>
							<p>{product.type}</p>
						</div>
						<div className='flex justify-between'>
							<p className='text-sm text-gray-500'>Popularity</p>
							<p>{product.popularity}</p>
						</div>
					</div>
				</div>
			</div>

			{/* about */}
			<div className='grid sm:grid-cols-12 xl:grid-cols-24 xl:gap-4'>
				<div className='sm:col-span-12'>
					<h3 className='my-4'>About</h3>
					{/* line */}
					<div className='w-full mb-4 border-t border-gray-300'></div>
					<p>{product.description}</p>
				</div>

				<div className='sm:col-span-12'>
					<h3 className='my-4'>Tech specs</h3>
					{/* line */}
					<div className='w-full mb-4 border-t border-gray-300'></div>
					<div className='flex justify-between mb-4'>
						<p className='text-sm font-semibold text-gray-500'>Screen</p>
						<p className='text-sm font-semibold'>Screen</p>
					</div>
					<div className='flex justify-between mb-4'>
						<p className='text-sm font-semibold text-gray-500'>Screen</p>
						<p className='text-sm font-semibold'>Screen</p>
					</div>
					<div className='flex justify-between mb-4'>
						<p className='text-sm font-semibold text-gray-500'>Screen</p>
						<p className='text-sm font-semibold'>Screen</p>
					</div>
					<div className='flex justify-between mb-4'>
						<p className='text-sm font-semibold text-gray-500'>Screen</p>
						<p className='text-sm font-semibold'>Screen</p>
					</div>
					<div className='flex justify-between mb-4'>
						<p className='text-sm font-semibold text-gray-500'>Screen</p>
						<p className='text-sm font-semibold'>Screen</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductItem
