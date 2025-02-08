'use client'

import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CancelPage() {
	const router = useRouter()

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className=' min-h-screen bg-gray-100 p-6 flex items-center justify-center'
		>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: [1.2, 1] }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				className=' bg-white p-6 rounded-xl shadow-lg flex flex-col items-center w-full max-w-2xl'
			>
				<XCircle className='w-16 h-16 text-red-500 mb-4' />
				<h2 className='text-2xl font-semibold text-gray-800'>
					Payment canceled
				</h2>
				<p className='text-gray-600 text-center mt-2'>
					If an error occurs, try again.
				</p>
				<div className='flex flex-col md:flex-row items-center gap-4 mt-4'>
					<button
						onClick={() => router.push('/checkout')}
						className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
					>
						Try again
					</button>
					<button
						onClick={() => router.push('/')}
						className='px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600'
					>
						Go Back Home
					</button>
				</div>
			</motion.div>
		</motion.div>
	)
}
