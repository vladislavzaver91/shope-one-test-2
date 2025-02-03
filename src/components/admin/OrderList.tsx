'use client'

import { Order } from '@/types'
import { motion } from 'framer-motion'
import { useState } from 'react'
import OrderDetails from './OrderDetails'

interface OrderListProps {
	orders: Order[]
}

const OrderList = ({ orders }: OrderListProps) => {
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

	const handleViewDetails = (orderId: string) => {
		setSelectedOrderId(orderId)
	}

	const handleCloseDetails = () => {
		setSelectedOrderId(null)
	}

	return (
		<div className='p-4'>
			{selectedOrderId ? (
				<OrderDetails
					order={orders.find(order => order.id === selectedOrderId)!}
					onClose={handleCloseDetails}
				/>
			) : (
				<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
					{orders.map(order => (
						<motion.div
							key={order.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className='bg-white p-6 shadow-lg rounded-lg'
						>
							<h3 className='text-lg font-semibold mb-2'>{order.id}</h3>
							<p className='text-gray-600 mb-2'>
								Order created at: {order.createdAt}
							</p>
							<p className='text-gray-600 mb-2'>
								Order updated at: {order.updatedAt}
							</p>
							<p className='text-gray-600 mb-2'>Total Amount: $ </p>
							<p className='text-gray-600 mb-4'>Status: {order.status}</p>

							<button
								onClick={() => handleViewDetails(order.id)}
								className='bg-blue-500 text-white p-2 rounded-lg'
							>
								View Details
							</button>
						</motion.div>
					))}
				</div>
			)}
		</div>
	)
}

export default OrderList
