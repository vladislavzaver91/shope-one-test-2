'use client'

import { useCart } from '@/helpers/context/CartContext'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const ShippingForm = dynamic(
	() => import('../../components/checkout/ShippingForm'),
	{
		ssr: false,
	}
)

const PaymentMethodSelector = dynamic(
	() => import('../../components/checkout/PaymentMethodSelector'),
	{
		ssr: false,
	}
)

const StripeCheckout = dynamic(
	() => import('../../components/checkout/StripeCheckout'),
	{
		ssr: false,
	}
)

export default function CheckoutPage() {
	const [step, setStep] = useState(1)
	const [shippingData, setShippingData] = useState(null)
	const [paymentMethod, setPaymentMethod] = useState('')
	const { cart } = useCart()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleShippingSubmit = (data: any) => {
		setShippingData(data)
		setStep(2)
	}

	const handlePaymentMethodSelect = (method: string) => {
		setPaymentMethod(method)
		setStep(3)
	}

	const handleCompleteOrder = () => {
		if (!shippingData || !paymentMethod || cart.length === 0) {
			alert('Please, fill in all details.')
			return
		}

		const newOrder = {
			id: `order-${new Date().toISOString()}`,
			date: new Date().toISOString(),
			shippingData,
			paymentMethod,
			cartItems: cart,
		}

		const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')

		localStorage.setItem(
			'orders',
			JSON.stringify([...existingOrders, newOrder])
		)

		setShippingData(null)
		setPaymentMethod('')
	}

	return (
		<div className='max-w-2xl mx-auto p-6 space-y-6'>
			{step === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
			{step === 2 && (
				<PaymentMethodSelector onSelect={handlePaymentMethodSelect} />
			)}
			{step === 3 && <StripeCheckout onCompleteOrder={handleCompleteOrder} />}
		</div>
	)
}
