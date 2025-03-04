// 'use client'

// import { useCart } from '@/helpers/context/CartContext'
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
// import { motion } from 'framer-motion'
// import { CreditCard } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'

// interface StripeCheckoutProps {
// 	paymentMethod: string
// 	handleCompleteOrder: () => void
// }

// const stripePromise = loadStripe(
// 	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
// )

// const StripeCheckout = ({
// 	paymentMethod,
// 	handleCompleteOrder,
// }: StripeCheckoutProps) => {
// 	const router = useRouter()
// 	const { cart, clearCart } = useCart()
// 	const [loading, setLoading] = useState(false)

// 	useEffect(() => {
// 		const urlParams = new URLSearchParams(window.location.search)
// 		if (urlParams.get('session_id')) {
// 			clearCart()
// 			handleCompleteOrder()
// 			router.push('/app/checkout/success')
// 		}
// 	}, [router, clearCart, handleCompleteOrder])

// 	const handleCheckout = async () => {
// 		setLoading(true)
// 		try {
// 			const response = await fetch('/api/payment', {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify({ items: cart, paymentMethod }),
// 			})

// 			const { sessionId } = await response.json()
// 			if (sessionId) {
// 				const stripe = await stripePromise
// 				await stripe?.redirectToCheckout({ sessionId })
// 			}
// 		} catch (error) {
// 			console.error('Ошибка при оплате:', error)
// 		}
// 		setLoading(false)
// 	}

// 	return (
// 		<Elements stripe={stripePromise}>
// 			<div className='relative p-6 bg-gray-50 rounded-xl shadow-lg space-y-6'>
// 				<motion.h2
// 					initial={{ y: -20, opacity: 0 }}
// 					animate={{ y: 0, opacity: 1 }}
// 					transition={{ duration: 0.5 }}
// 					className='font-nunito tracking-wider text-xl font-semibold text-gray-800 text-center'
// 				>
// 					Complete Your Payment
// 				</motion.h2>

// 				<div className='flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4'>
// 					<motion.div
// 						initial={{ opacity: 0, scale: 0.9 }}
// 						animate={{ opacity: 1, scale: 1 }}
// 						transition={{ duration: 0.5 }}
// 						className='w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-100'
// 					>
// 						<CreditCard className='w-8 h-8 text-blue-500' />
// 					</motion.div>
// 					<p className='text-gray-500 text-center'>
// 						Proceed with {paymentMethod} Checkout
// 					</p>
// 				</div>

// 				<motion.button
// 					initial={{ opacity: 0, y: 20 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.5, delay: 0.3 }}
// 					className={`w-full py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition ${
// 						loading ? 'opacity-50 cursor-not-allowed' : ''
// 					}`}
// 					onClick={handleCheckout}
// 					disabled={loading}
// 				>
// 					{loading ? 'Processing...' : 'Pay Now'}
// 				</motion.button>
// 			</div>
// 		</Elements>
// 	)
// }

// export default StripeCheckout
