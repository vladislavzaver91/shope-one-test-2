'use client'

import { useCart } from '@/helpers/context/CartContext'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
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
			<div className='w-full h-60 bg-gray-200 flex items-center justify-center rounded-lg'>
				<p className='text-gray-500'>Stripe payment form</p>
				<button
					className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
					onClick={handleConfirmPayment}
				>
					Confirm payment
				</button>
			</div>
		</Elements>
	)
}

export default StripeCheckout
