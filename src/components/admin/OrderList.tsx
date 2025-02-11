'use client'

import { Order } from '@/types'
import { motion } from 'framer-motion'
import { useState } from 'react'
import OrderDetails from './OrderDetails'

interface OrderListProps {
	orders: Order[]
}

const formatDate = (isoString: string) => {
	return new Date(isoString).toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

const ITEMS_PER_PAGE_OPTIONS = 12

const OrderList = ({ orders }: OrderListProps) => {
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
	const [filter, setFilter] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	const filteredOrders = orders.filter(order => {
		return Object.values(order).some(
			value =>
				value !== null &&
				value !== undefined &&
				value.toString().toLowerCase().includes(filter.toLowerCase())
		)
	})

	const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE_OPTIONS)
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE_OPTIONS
	const currentOrders = filteredOrders.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE_OPTIONS
	)

	const handleViewDetails = (orderId: string) => {
		setSelectedOrderId(orderId)
	}

	const handleCloseDetails = () => {
		setSelectedOrderId(null)
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3 }}
			className='p-6'
		>
			<div className='mb-8'>
				<input
					type='text'
					value={filter}
					onChange={e => setFilter(e.target.value)}
					placeholder='Search...'
					className='w-36 md:w-56 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>
			{selectedOrderId ? (
				(() => {
					const selectedOrder = orders.find(
						order => order.id === selectedOrderId
					)
					return selectedOrder ? (
						<OrderDetails order={selectedOrder} onClose={handleCloseDetails} />
					) : (
						<p className='text-red-500'>Order not found</p>
					)
				})()
			) : (
				<>
					<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
						{currentOrders.map(order => (
							<motion.div
								key={order.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
								className='bg-white p-6 shadow-lg rounded-lg'
							>
								<h3 className='text-lg font-semibold mb-2'>
									Order ID: {order.id}
								</h3>
								<p className='text-gray-600 mb-2'>
									Order created at: {formatDate(order.createdAt)}
								</p>
								<p className='text-gray-600 mb-2'>
									Order updated at: {formatDate(order.updatedAt)}
								</p>
								<p className='text-gray-600 mb-4'>Status: {order.status}</p>

								<button
									onClick={() => handleViewDetails(order.id)}
									className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600'
								>
									View Details
								</button>
							</motion.div>
						))}
					</div>

					{/* Пагинация */}
					{totalPages > 1 && (
						<div className='flex justify-center gap-2 mt-10'>
							<button
								onClick={() => setCurrentPage(1)}
								disabled={currentPage === 1}
								className='p-2 hover:bg-gray-300 disabled:opacity-50'
							>
								First
							</button>
							<button
								onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className='p-2 hover:bg-gray-300 disabled:opacity-50'
							>
								Prev
							</button>

							{[...Array(totalPages)].map((_, i) => (
								<button
									key={i}
									onClick={() => setCurrentPage(i + 1)}
									className={`px-4 py-1 rounded-full text-[12px] ${
										currentPage === i + 1
											? 'bg-blue-500 text-white'
											: 'bg-gray-200 hover:bg-gray-300'
									}`}
								>
									{i + 1}
								</button>
							))}

							<button
								onClick={() =>
									setCurrentPage(prev => Math.min(prev + 1, totalPages))
								}
								disabled={currentPage === totalPages}
								className='p-2 hover:bg-gray-300 disabled:opacity-50'
							>
								Next
							</button>
							<button
								onClick={() => setCurrentPage(totalPages)}
								disabled={currentPage === totalPages}
								className='p-2 hover:bg-gray-300 disabled:opacity-50'
							>
								Last
							</button>
						</div>
					)}
				</>
			)}
		</motion.div>
	)
}

export default OrderList
