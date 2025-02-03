'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaChartLine, FaClipboardList, FaProductHunt } from 'react-icons/fa'

interface AdminSidebarProps {
	activePage: 'products' | 'orders' | 'statistics'
	setActivePage: (page: 'products' | 'orders' | 'statistics') => void
}

const AdminSidebar = ({ activePage, setActivePage }: AdminSidebarProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleToggleSidebar = () => {
		setIsOpen(!isOpen)
	}

	return (
		<motion.div
			className={`bg-white shadow-md fixed top-0 left-0 h-full z-50 transform transition-all ${
				isOpen ? 'w-64' : 'w-16'
			}`}
			initial={{ x: -250 }}
			animate={{ x: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className='flex flex-col items-center mt-6'>
				<button onClick={handleToggleSidebar} className='text-xl mb-6'>
					{isOpen ? 'Close' : 'Open'}
				</button>

				<div className='space-y-4'>
					<button
						className={`flex items-center space-x-4 text-lg ${
							activePage === 'products' ? 'text-blue-500' : 'text-gray-700'
						}`}
						onClick={() => setActivePage('products')}
					>
						<FaProductHunt />
						{isOpen && <span>Products</span>}
					</button>

					<button
						className={`flex items-center space-x-4 text-lg ${
							activePage === 'orders' ? 'text-blue-500' : 'text-gray-700'
						}`}
						onClick={() => setActivePage('orders')}
					>
						<FaClipboardList />
						{isOpen && <span>Orders</span>}
					</button>

					<button
						className={`flex items-center space-x-4 text-lg ${
							activePage === 'statistics' ? 'text-blue-500' : 'text-gray-700'
						}`}
						onClick={() => setActivePage('statistics')}
					>
						<FaChartLine />
						{isOpen && <span>Statistics</span>}
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default AdminSidebar
