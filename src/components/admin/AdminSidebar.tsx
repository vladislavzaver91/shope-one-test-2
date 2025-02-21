'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { CgMenuLeftAlt, CgMenuRightAlt } from 'react-icons/cg'
import {
	FaChartLine,
	FaClipboardList,
	FaCogs,
	FaProductHunt,
} from 'react-icons/fa'

interface AdminSidebarProps {
	activePage: 'products' | 'orders' | 'statistics' | 'cms'
	setActivePage: (page: 'products' | 'orders' | 'statistics' | 'cms') => void
}

const SIDEBAR_NAV_ITEMS = [
	{ id: 'products', name: 'Products', icon: FaProductHunt },
	{ id: 'orders', name: 'Orders', icon: FaClipboardList },
	{ id: 'statistics', name: 'Statistics', icon: FaChartLine },
	{ id: 'cms', name: 'CMS', icon: FaCogs },
] as const

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
					{SIDEBAR_NAV_ITEMS.map(({ id, name, icon: Icon }) => (
						<button
							key={id}
							className={`flex items-center space-x-4 text-lg hover:text-gray-400 transition-colors ${
								activePage === id ? 'text-blue-500' : 'text-gray-700'
							}`}
							onClick={() => {
								setActivePage(id)
								setIsOpen(false)
							}}
						>
							<Icon size={24} />
							{isOpen && <span>{name}</span>}
						</button>
					))}
				</div>
			</div>
		</motion.div>
	)
}

export default AdminSidebar
