'use client'

import { useCart } from '@/helpers/context/CartContext'
import { COLORS } from '@/helpers/variables/colors'
import { Product } from '@/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ProductItemProps {
	product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
	const [quantity, setQuantity] = useState(1)
	const [mainImage, setMainImage] = useState(
		product.images.length > 0 ? product.images[0] : '/placeholder.jpg'
	)
	const [isColorSelectOpen, setIsColorSelectOpen] = useState<boolean>(false)
	const [selectedColor, setSelectedColor] = useState<string | null>(null)

	const imageUrl = mainImage.startsWith('/')
		? mainImage
		: `/uploads/${mainImage}`

	const { addToCart } = useCart()

	const handleAddToCart = () => {
		addToCart(product, quantity)
		console.log(`${product.title} added to cart!`)
	}

	useEffect(() => {
		if (product.colorsAvailable.length > 0) {
			setSelectedColor(product.colorsAvailable[0])
		}
	}, [product.colorsAvailable])

	const handleColorSelect = (color: string) => {
		setSelectedColor(color)
		setIsColorSelectOpen(false)
	}

	return (
		// <div className="max-w-full p-4">
		//   <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
		//   <div className="grid sm:grid-cols-12 xl:grid-cols-24 gap-4 items-center">
		//     {/* images gallery*/}
		//     <div className="flex flex-row justify-center gap-2 sm:mb-10 sm:flex-col sm:col-start-1 sm:col-end-2">
		//       {product.images.map((img, index) => (
		//         <div
		//           key={index}
		//           className="relative w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg cursor-pointer hover:border-gray-800 transition"
		//         >
		//           <Image
		//             src={`/${imageSrc}.jpg`}
		//             alt={`Thumbnail ${index}`}
		//             width={42}
		//             height={42}
		//             className="h-4/5"
		//           />
		//         </div>
		//       ))}
		//     </div>

		//     {/* main img */}
		//     <div className="relative sm:col-start-3 sm:col-end-10 flex justify-center items-center h-96 border rounded-lg sm:h-[464px] mb-4">
		//       <Image
		//         src={`/${imageSrc}.jpg`}
		//         alt="Main product image"
		//         fill
		//         className="h-full w-full object-cover object-center"
		//       />
		//     </div>

		//     {/* product details */}
		//     <div className="sm:col-start-11 sm:col-end-20 space-y-6">
		//       <div>
		//         <p className="text-sm text-gray-500 mb-1">Available Colors</p>
		//         <div className="flex space-x-2">
		//           {product.colorsAvailable.map((color, index) => (
		//             <div
		//               key={index}
		//               className="w-8 h-8 rounded-full border hover:border-gray-800 transition"
		//               style={{ backgroundColor: color }}
		//             ></div>
		//           ))}
		//         </div>
		//       </div>
		//       {/* line */}
		//       <div className="w-full mb-4 border-t border-gray-300"></div>

		//       {/* quantity */}
		//       <div className="flex items-center mb-4">
		//         <label htmlFor="quantity" className="mr-4">
		//           Quantity:
		//         </label>
		//         <input
		//           type="number"
		//           id="quantity"
		//           value={quantity}
		//           min={1}
		//           onChange={(e) => setQuantity(Number(e.target.value))}
		//           className="w-16 border border-gray-300 rounded-lg text-center"
		//         />
		//       </div>
		//       {/* line */}
		//       <div className="w-full mb-4 border-t border-gray-300"></div>

		//       <div>
		//         <p className="text-lg font-bold">{product.price}$</p>
		//       </div>
		//       {/* btns */}
		//       <div className="flex space-x-4">
		//         <button
		//           onClick={handleAddToCart}
		//           className="px-4 py-2 w-full text-center bg-green-600 text-white rounded-lg hover:bg-green-700"
		//         >
		//           Add to Cart
		//         </button>
		//         <Link
		//           href="/checkout"
		//           className="px-4 py-2 w-full text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
		//         >
		//           Buy Now
		//         </Link>
		//       </div>
		//       <div className="space-y-2">
		//         <div className="flex justify-between">
		//           <p className="text-sm text-gray-500">Category</p>
		//           <p>{product.category}</p>
		//         </div>
		//         <div className="flex justify-between">
		//           <p className="text-sm text-gray-500">Type</p>
		//           <p>{product.type}</p>
		//         </div>
		//       </div>
		//     </div>
		//   </div>

		//   {/* about */}
		//   <div className="grid sm:grid-cols-12 xl:grid-cols-24 xl:gap-4">
		//     <div className="sm:col-span-12">
		//       <h3 className="my-4">About</h3>
		//       {/* line */}
		//       <div className="w-full mb-4 border-t border-gray-300"></div>
		//       <p>{product.description}</p>
		//     </div>

		//     <div className="sm:col-span-12">
		//       <h3 className="my-4">Tech specs</h3>
		//       {/* line */}
		//       <div className="w-full mb-4 border-t border-gray-300"></div>
		//       {/* Здесь можно добавить спецификации продукта */}
		//     </div>
		//   </div>
		// </div>

		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-full py-4'
		>
			<h1 className='text-3xl font-bold text-[#1a237e] mb-4'>
				{product.title}
			</h1>
			<div className='grid sm:grid-cols-12 xl:grid-cols-24 gap-4 items-center'>
				{/* Images Gallery */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='flex flex-row justify-center gap-2 sm:mb-10 sm:flex-col sm:col-start-1 sm:col-end-2'
				>
					{product.images.map((img, index) => (
						<div
							key={index}
							className='relative w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg cursor-pointer hover:border-gray-800 transition'
							onClick={() => setMainImage(img)}
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
				</motion.div>

				{/* Main Image */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className='relative sm:col-start-3 sm:col-end-10 flex justify-center items-center h-96 border rounded-lg sm:h-[464px] mb-4 overflow-hidden shadow-md'
				>
					<Image
						src={imageUrl}
						alt='Main product image'
						fill
						className='h-full w-full object-contain object-center'
					/>
				</motion.div>

				{/* Product Details */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='sm:col-start-11 sm:col-end-20 space-y-6'
				>
					{product.colorsAvailable && product.colorsAvailable.length > 0 && (
						<div>
							<p className='text-sm text-gray-500 mb-1'>Available Colors</p>

							<div className='relative flex flex-col'>
								<div
									className='w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer'
									style={{
										backgroundColor: selectedColor
											? COLORS[selectedColor as keyof typeof COLORS]
											: COLORS.black,
									}}
									onClick={() => setIsColorSelectOpen(prev => !prev)}
								>
									<span className='sr-only'>
										{selectedColor ? selectedColor : 'Select color'}
									</span>
								</div>
								{product.colorsAvailable.length > 1 && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{
											opacity: isColorSelectOpen ? 1 : 0,
											height: isColorSelectOpen ? 'auto' : 0,
										}}
										transition={{ duration: 0.3 }}
										className='absolute top-10 -left-2 grid grid-cols-3 gap-2 bg-white shadow-md rounded-lg p-2 z-10'
									>
										{product.colorsAvailable.map((color, index) =>
											color !== selectedColor ? (
												<div
													key={index}
													onClick={() => handleColorSelect(color)}
													className='flex flex-col space-y-2 cursor-pointer'
												>
													<div
														className='w-8 h-8 rounded-full border border-gray-400'
														style={{
															backgroundColor:
																COLORS[color as keyof typeof COLORS],
														}}
													/>
													<span className='text-sm'>{color}</span>
												</div>
											) : null
										)}
									</motion.div>
								)}
							</div>
							<div className='w-full my-4 border-t border-gray-300'></div>
						</div>
					)}

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

					<div className='w-full mb-4 border-t border-gray-300'></div>

					<div>
						<p className='text-lg font-bold'>{product.price}$</p>
					</div>

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
					</div>
				</motion.div>
			</div>

			{/* About */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='grid sm:grid-cols-12 xl:grid-cols-24 xl:gap-4 mt-8'
			>
				<div className='sm:col-span-12'>
					<h3 className='text-lg font-semibold text-[#1a237e] my-4'>About</h3>
					<div className='w-full mb-4 border-t border-gray-300'></div>
					<p>{product.description}</p>
				</div>

				<div className='sm:col-span-12'>
					<h3 className='text-lg font-semibold text-[#1a237e] my-4'>
						Tech specs
					</h3>
					<div className='w-full mb-4 border-t border-gray-300'></div>
					{/* Additional specifications */}
				</div>
			</motion.div>
		</motion.div>
	)
}

export default ProductItem
