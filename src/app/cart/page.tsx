'use client'

import { useCart } from '@/helpers/context/CartContext'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'

export default function CartPage() {
	const { cart, updateQuantity, removeFromCart } = useCart()

	const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

	return (
		<section className='heading-section '>
			<motion.div
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className='max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg'
			>
				<motion.h1
					initial={{ x: -20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className='font-[family-name:var(--font-nunito-sans)] tracking-wider text-4xl font-bold mb-6 text-center text-[#1a237e]'
				>
					Cart
				</motion.h1>
				{cart.length === 0 ? (
					<p className='text-center text-gray-600'>Your cart is empty.</p>
				) : (
					<>
						<ul className='space-y-4'>
							{cart.map(item => {
								const imageSrc =
									item.images.length > 0 ? item.images[0] : '/placeholder.jpg'

								const imageUrl = imageSrc.startsWith('/')
									? imageSrc
									: `/uploads/${imageSrc}`
								return (
									<li
										key={item.id}
										className='flex items-center justify-between p-4 bg-white rounded-lg shadow-md transition duration-200 hover:shadow-lg'
									>
										<div className='relative flex-shrink-0 w-24 h-24'>
											<Image
												src={imageUrl}
												alt={item.title}
												fill
												className='w-full h-full object-contain object-center rounded-lg'
											/>
										</div>
										<div className='flex flex-col flex-1 md:flex-row justify-between md:items-center ml-4'>
											<div className='mb-2 md:mb-0 md:mr-4'>
												<p className='font-semibold text-lg'>{item.title}</p>
												<p className='text-gray-600 text-base'>
													${item.price.toFixed(2)}
												</p>
											</div>

											<div className='flex items-center space-x-4'>
												<input
													type='number'
													value={item.quantity}
													min={1}
													onChange={e =>
														updateQuantity(item.id, Number(e.target.value))
													}
													className='w-16 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring focus:ring-blue-500'
												/>
												<button
													onClick={() => removeFromCart(item.id)}
													className='text-red-600 hover:text-red-800 flex items-center space-x-1'
												>
													<FaTrash />
													<span>Delete</span>
												</button>
											</div>
										</div>
									</li>
								)
							})}
						</ul>

						<div className='mt-6 flex justify-between items-center'>
							<p className='text-xl font-bold'>Total: ${total.toFixed(2)}</p>
							<Link
								href='/checkout'
								className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200'
							>
								Go to checkout
							</Link>
						</div>
					</>
				)}
			</motion.div>
		</section>
	)
}
