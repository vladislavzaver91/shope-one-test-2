'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { CgMenuLeftAlt, CgMenuRightAlt } from 'react-icons/cg'
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
				isOpen ? 'w-64' : 'w-14 sm:w-16'
			}`}
			initial={{ x: -250 }}
			animate={{ x: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className='flex flex-col items-center mt-6 px-4'>
				<button
					onClick={handleToggleSidebar}
					className={`text-xl mb-10 hover:text-blue-500  transition-colors ${
						isOpen && 'ml-auto'
					}`}
				>
					{isOpen ? <CgMenuLeftAlt size={24} /> : <CgMenuRightAlt size={24} />}
				</button>

				<div className='space-y-6'>
					<button
						className={`flex items-center space-x-4 text-lg hover:text-gray-400 transition-colors ${
							activePage === 'products' ? 'text-blue-500' : 'text-gray-700'
						}`}
						onClick={() => setActivePage('products')}
					>
						<FaProductHunt size={24} />
						{isOpen && <span>Products</span>}
					</button>

					<button
						className={`flex items-center space-x-4 text-xl hover:text-gray-400 transition-colors ${
							activePage === 'orders' ? 'text-blue-500' : 'text-gray-700'
						}`}
						onClick={() => setActivePage('orders')}
					>
						<FaClipboardList size={24} />
						{isOpen && <span>Orders</span>}
					</button>

					<button
						className={`flex items-center space-x-4 text-lg hover:text-gray-400 transition-colors ${
							activePage === 'statistics' ? 'text-blue-500' : 'text-gray-700'
						}`}
						onClick={() => setActivePage('statistics')}
					>
						<FaChartLine size={24} />
						{isOpen && <span>Statistics</span>}
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default AdminSidebar
