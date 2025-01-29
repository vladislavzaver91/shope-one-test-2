'use client'

import { useCart } from '@/helpers/context/CartContext'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe('your-stripe-public-key')

interface StripeCheckoutProps {
	onCompleteOrder: () => void
}

const StripeCheckout = ({ onCompleteOrder }: StripeCheckoutProps) => {
	const router = useRouter()
	const { clearCart } = useCart()

	const handleConfirmPayment = () => {
		console.log('Payment completed successfully!')
		onCompleteOrder()
		clearCart()
		router.push('/')
	}

	return (
		<Elements stripe={stripePromise}>
			<div className='relative p-6 bg-gray-50 rounded-xl shadow-lg space-y-6'>
				{/* Background Decorations */}
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
					Complete Your Payment
				</motion.h2>

				{/* Stripe Payment Form Placeholder */}
				<div className='flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4'>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className='w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100'
					>
						<CreditCard className='w-8 h-8 text-blue-500' />
					</motion.div>
					<p className='text-gray-500 text-center'>
						Stripe payment form will appear here
					</p>
				</div>

				{/* Confirm Payment Button */}
				<motion.button
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className='w-full py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
					onClick={handleConfirmPayment}
				>
					Confirm Payment
				</motion.button>
			</div>
		</Elements>
	)
}

export default StripeCheckout
