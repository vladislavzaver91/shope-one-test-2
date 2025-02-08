'use client'

import { motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'

interface PaymentMethodProps {
	onSelect: (method: string) => void
}

const PaymentMethodSelector = ({ onSelect }: PaymentMethodProps) => {
	const paymentMethods = [
		{
			name: 'Credit Card',
			method: 'card',
			icon: <CreditCard className='w-6 h-6 text-blue-500' />,
		},
	]

	return (
		<div className='relative bg-gray-50 rounded-xl shadow-lg p-6 space-y-6'>
			{/* Background elements */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 0.1, scale: 1 }}
				transition={{ duration: 1 }}
				className='absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-xl -z-10'
			/>
			<motion.div
				initial={{ x: -50, opacity: 0 }}
				animate={{ x: 0, opacity: 0.15 }}
				transition={{ duration: 1.2, delay: 0.3 }}
				className='absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full -z-10'
			/>
			<motion.div
				initial={{ x: 50, opacity: 0 }}
				animate={{ x: 0, opacity: 0.15 }}
				transition={{ duration: 1.2, delay: 0.5 }}
				className='absolute -bottom-10 -right-10 w-32 h-32 bg-blue-300 rounded-full -z-10'
			/>

			{/* Header */}
			<motion.h2
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className='font-[family-name:var(--font-nunito-sans)] tracking-wider text-xl font-semibold text-gray-800 text-center'
			>
				Select Payment Method
			</motion.h2>

			{/* Payment Method Buttons */}
			<div className='space-y-4'>
				{paymentMethods.map(({ name, icon, method }) => (
					<motion.button
						key={name}
						onClick={() => onSelect(method)}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.2 }}
						className='w-full flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
					>
						{icon}
						<span className='text-gray-800 font-medium'>{name}</span>
					</motion.button>
				))}
			</div>
		</div>
	)
}

export default PaymentMethodSelector
