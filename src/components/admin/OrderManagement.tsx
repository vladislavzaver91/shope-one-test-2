'use client'

import { truncateDescription } from '@/helpers/functions/truncateDescription'
import { Order } from '@/types'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

interface OrderManagementProps {
	orders: Order[] // Assuming orders is passed as a prop now.
}

const OrderManagement = ({ orders }: OrderManagementProps) => {
	const [openOrderId, setOpenOrderId] = useState<string | null>(null)

	return (
		<div className='bg-white p-4 rounded-lg shadow-md'>
			<h2 className='text-xl font-semibold mb-4'>Orders</h2>
			{orders && orders.length > 0 ? (
				<ul className='space-y-2'>
					{orders.map(order => {
						const totalAmount = order.cartItems.reduce(
							(total, item) => total + item.price * item.quantity,
							0
						)

						const isDetailsOpen = openOrderId === order.id
						return (
							<li key={order.id}>
								<div className='flex flex-col'>
									<span className='text-sm'>
										<strong>Order ID</strong> {order.id}
									</span>
									<span className='text-sm'>
										<strong>Order created at:</strong>{' '}
										{new Date(order.createdAt).toLocaleString()}
									</span>
								</div>
								<button
									onClick={() =>
										setOpenOrderId(isDetailsOpen ? null : order.id)
									}
									className='text-blue-600 hover:underline mt-2'
								>
									{isDetailsOpen ? 'Hide Details' : 'Show Details'}
								</button>
								<div
									className={clsx(
										'transform transition-all duration-300 ease-in-out overflow-hidden',
										isDetailsOpen
											? 'max-h-[450px] opacity-100'
											: 'max-h-0 opacity-0'
									)}
								>
									<div className='mt-4 p-3 bg-gray-100 border-t border-gray-300 h-[500px] overflow-y-auto'>
										<div className='flex justify-between mb-4'>
											<div>
												<h3 className='font-semibold text-base mb-2'>
													Order #{order.id}
												</h3>
												<p className='mb-2'>
													Created at:{' '}
													{new Date(order.createdAt).toLocaleString()}
												</p>
												<p className='mb-2'>
													Updated at:{' '}
													{new Date(order.updatedAt).toLocaleString()}
												</p>
												<p>Payment method: {order.paymentMethod}</p>
											</div>
											<p className='font-semibold text-base'>
												Total amount: ${totalAmount.toFixed(2)}
											</p>
										</div>

										<ul className='space-y-4'>
											{order.cartItems.map(cartItem => (
												<li
													key={cartItem.id}
													className='flex bg-white p-4 rounded-lg shadow-md border border-gray-200'
												>
													<div className='relative flex-shrink-0 w-24 h-24 mr-4'>
														<Image
															src={cartItem.images[0] || '/placeholder.jpg'}
															alt={cartItem.title}
															fill
															className='w-full h-full object-cover object-center rounded-lg shadow-md'
														/>
													</div>
													<div className='flex flex-col md:flex-row justify-between flex-1'>
														<div className='mb-2 md:mb-0 md:mr-4'>
															<p className='font-bold text-sm'>
																{cartItem.title}
															</p>
															<p className='text-gray-600 text-sm'>
																${cartItem.price.toFixed(2)}
															</p>
															<p className='text-gray-600 text-sm'>
																Quantity: {cartItem.quantity}
															</p>
														</div>

														<div className='text-sm'>
															{truncateDescription(cartItem.description, 30)}
														</div>

														<div className='flex flex-col w-[80px]'>
															<p className='text-gray-600 text-sm'>
																{cartItem.type}
															</p>
															<p className='text-gray-600 text-sm'>
																{cartItem.category}
															</p>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							</li>
						)
					})}
				</ul>
			) : (
				<p>No orders available.</p>
			)}
		</div>
	)
}

export default OrderManagement
