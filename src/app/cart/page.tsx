'use client'

import { useCart } from '@/helpers/context/CartContext'
import useColorDropdownOnCart from '@/helpers/hooks/useColorDropdownOnCart'
import { COLORS } from '@/helpers/variables/colors'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'

export default function CartPage() {
	const { cart, updateQuantity, removeFromCart } = useCart()
	const { openColorSelect, setOpenColorSelect } = useColorDropdownOnCart()
	const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

	const handleColorChange = (id: string, color: string) => {
		updateQuantity(id, cart.find(item => item.id === id)!.quantity, color)
		setOpenColorSelect(prev => ({ ...prev, [id]: false }))
	}

	return (
		<section className='heading-section'>
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

												{/* Отображение текущего цвета */}
												{item.selectedColor && (
													<p className='text-gray-600 text-sm mt-2'>
														Color: {item.selectedColor}
													</p>
												)}

												{/* Выбор цвета */}
												{item.colorsAvailable &&
													item.colorsAvailable.length > 0 && (
														<div className='relative flex flex-col mt-2'>
															<p className='text-sm text-gray-500'>
																Choose a Color:
															</p>

															<div
																data-color-button
																className='w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer'
																style={{
																	backgroundColor: item.selectedColor
																		? COLORS[
																				item.selectedColor as keyof typeof COLORS
																		  ]
																		: COLORS.black,
																}}
																onClick={() =>
																	setOpenColorSelect(prev => ({
																		...prev,
																		[item.id]: !prev[item.id],
																	}))
																}
															>
																<span className='sr-only'>
																	{item.selectedColor
																		? item.selectedColor
																		: 'Select color'}
																</span>
															</div>

															{/* Выбор цвета (анимированная сетка) */}
															{item.colorsAvailable.length > 1 && (
																<motion.div
																	data-color-select
																	initial={{ opacity: 0, height: 0 }}
																	animate={{
																		opacity: openColorSelect[item.id] ? 1 : 0,
																		height: openColorSelect[item.id]
																			? 'auto'
																			: 0,
																	}}
																	transition={{ duration: 0.3 }}
																	className='absolute max-w-40 w-full md:w-40 top-14 -left-2 grid grid-cols-3 gap-2 bg-white shadow-md rounded-lg p-2 z-10'
																>
																	{item.colorsAvailable.map(
																		color =>
																			color !== item.selectedColor && (
																				<div
																					key={color}
																					onClick={() =>
																						handleColorChange(item.id, color)
																					}
																					className='cursor-pointer'
																				>
																					<div
																						className='w-8 h-8 rounded-full border border-gray-400'
																						style={{
																							backgroundColor:
																								COLORS[
																									color as keyof typeof COLORS
																								],
																						}}
																					/>
																					<span className='text-sm'>
																						{color}
																					</span>
																				</div>
																			)
																	)}
																</motion.div>
															)}
														</div>
													)}
											</div>

											<div className='flex items-center space-x-4'>
												<input
													type='number'
													value={item.quantity}
													min={1}
													onChange={e =>
														updateQuantity(
															item.id,
															Number(e.target.value),
															item.selectedColor || '' // Keep the selected color when updating quantity
														)
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
