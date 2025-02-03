'use client'

import { Order } from '@/types'

interface OrderDetailsProps {
	order: Order
	onClose: () => void
}

const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
	return (
		<div className='bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto'>
			<h2 className='text-2xl font-semibold mb-4'>Order Details</h2>
			<p className='text-gray-600 mb-2'>Order ID: {order.id}</p>
			<p className='text-gray-600 mb-2'>Order created at: {order.createdAt}</p>
			<p className='text-gray-600 mb-2'> Order updated at: {order.updatedAt}</p>
			<p className='text-gray-600 mb-2'>Total Amount: $</p>
			<p className='text-gray-600 mb-4'>Status: {order.status}</p>

			<h3 className='font-semibold mb-2'>Items:</h3>
			<ul className='list-disc pl-5 mb-4'>
				{order.cartItems.map((item, index) => (
					<li key={index} className='text-gray-600'>
						{item.title} - ${item.price}
					</li>
				))}
			</ul>

			<button
				onClick={onClose}
				className='bg-gray-500 text-white p-2 rounded-lg'
			>
				Close
			</button>
		</div>
	)
}

export default OrderDetails
