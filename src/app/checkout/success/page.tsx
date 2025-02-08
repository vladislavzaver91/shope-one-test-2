'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SuccessPage() {
	const router = useRouter()

	useEffect(() => {
		const timeout = setTimeout(() => {
			router.push('/')
		}, 5000)
		return () => clearTimeout(timeout)
	}, [router])

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'
		>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: [1.2, 1] }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				className=' bg-white p-6 rounded-xl shadow-lg flex flex-col items-center'
			>
				<CheckCircle className='w-16 h-16 text-green-500 mb-4' />
				<h2 className='text-2xl font-semibold text-gray-800'>
					Payment successful!
				</h2>
				<p className='text-gray-600 text-center mt-2'>
					Thanks for your purchase! We have sent you a confirmation.
				</p>
			</motion.div>
		</motion.div>
	)
}
