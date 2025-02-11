'use client'

import { Address, Order, Product } from '@/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface OrderDetailsProps {
	order: Order
	onClose: () => void
}

type OrderItem = {
	id: string
	orderId: string
	product: Product
	productId: string
	quantity: number
	selectedColor: string
}

const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
	const [orderItems, setOrderItems] = useState<OrderItem[]>([])
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const [loading, setLoading] = useState(true)

	const formatDate = (isoString: string) => {
		return new Date(isoString).toLocaleString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	useEffect(() => {
		const fetchOrderItems = async () => {
			try {
				const response = await fetch(`/api/order-item/${order.id}`)
				const data = await response.json()
				if (data) {
					setOrderItems(data || [])
					const price = data.reduce((acc: number, item: OrderItem) => {
						return acc + item.product.price * item.quantity
					}, 0)
					setTotalPrice(price)
				}
			} catch (error) {
				console.error('Error fetching order items:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchOrderItems()
	}, [order.id])

	console.log(order)
	console.log(orderItems)

	const deliveryAddress =
		typeof order.deliveryAddress === 'object'
			? (order.deliveryAddress as Address)
			: null

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6'>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
				className='bg-white p-6 shadow-xl rounded-lg border border-gray-200 md:col-span-2 xl:col-span-3'
			>
				<h2 className='text-2xl font-bold mb-6 text-gray-800'>Order Details</h2>
				{/* Основная информация */}
				<div className='space-y-3'>
					<p className='text-gray-700'>
						<strong className='text-gray-900'>Order ID:</strong> {order.id}
					</p>
					<p className='text-gray-700'>
						<strong className='text-gray-900'>Created at:</strong>{' '}
						{formatDate(order.createdAt)}
					</p>
					<p className='text-gray-700'>
						<strong className='text-gray-900'>Updated at:</strong>{' '}
						{formatDate(order.updatedAt)}
					</p>
					<p className='text-gray-700'>
						<strong className='text-gray-900'>Status:</strong> {order.status}
					</p>
					<p className='text-gray-900 font-semibold text-lg'>
						Total Price:{' '}
						<span className='text-green-600'>${totalPrice.toFixed(2)}</span>
					</p>

					{/* Продукты в заказе */}
					<h3 className='text-lg font-semibold mt-6 mb-3 text-gray-900'>
						Order Items
					</h3>
					{loading ? (
						<div className='flex justify-center items-center py-6'>
							<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
						</div>
					) : orderItems ? (
						<ul className='divide-y divide-gray-200'>
							{orderItems.map((orderItem, index) => {
								const imageSrc =
									orderItem.product.images &&
									orderItem.product.images.length > 0
										? orderItem.product.images[0]
										: '/placeholder.jpg'
								const imageUrl = imageSrc.startsWith('/')
									? imageSrc
									: `/uploads/${imageSrc}`
								const quantity = orderItem.quantity || 1

								return (
									<li
										key={index}
										className='py-3 flex justify-between items-center'
									>
										<div className='flex items-center space-x-4'>
											<div className='relative w-16 h-16'>
												<Image
													src={imageUrl}
													alt={orderItem.product.title}
													fill
													className='w-full h-full rounded-md object-contain object-center'
												/>
											</div>
											<div>
												<p className='text-gray-900 font-medium'>
													{orderItem.product.title}
												</p>
												<p className='text-gray-600 text-sm'>
													Category: {orderItem.product.category}
												</p>
												<p className='text-gray-600 text-sm'>
													Type: {orderItem.product.type}
												</p>
												<p className='text-gray-600 text-sm'>
													Selected color: {orderItem.selectedColor}
												</p>
												<p className='text-gray-600 text-sm'>
													Product ID: {orderItem.productId}
												</p>
											</div>
										</div>
										<div className='text-right'>
											<p className='text-gray-900 font-semibold'>
												${orderItem.product.price}
											</p>
											<p className='text-gray-600 text-sm'>
												Quantity: {quantity}
											</p>
											<p className='text-gray-900 font-medium'>
												Subtotal:{' '}
												<span className='text-green-600'>
													${(orderItem.product.price * quantity).toFixed(2)}
												</span>
											</p>
										</div>
									</li>
								)
							})}
						</ul>
					) : (
						<p className='text-gray-500'>No products found for this order.</p>
					)}
				</div>

				{/* Close Button */}
				<div className='flex justify-end mt-6'>
					<button
						onClick={onClose}
						className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all'
					>
						Close
					</button>
				</div>
			</motion.div>

			{/* Адрес доставки */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
				className='bg-gray-100 p-6 shadow-xl rounded-lg border border-gray-200'
			>
				<h3 className='text-lg font-semibold text-gray-900 mb-2'>
					Delivery Address
				</h3>
				{deliveryAddress ? (
					<>
						<p className='text-gray-700'>
							<strong>Name:</strong> {deliveryAddress.name}
						</p>
						<p className='text-gray-700'>
							<strong>Address:</strong> {deliveryAddress.address}
						</p>
						<p className='text-gray-700'>
							<strong>City:</strong> {deliveryAddress.city},{' '}
							{deliveryAddress.country}
						</p>
						<p className='text-gray-700'>
							<strong>Postal Code:</strong> {deliveryAddress.postalCode}
						</p>
					</>
				) : (
					<p className='text-gray-500'>No delivery address available.</p>
				)}
			</motion.div>
		</div>
	)
}

export default OrderDetails
