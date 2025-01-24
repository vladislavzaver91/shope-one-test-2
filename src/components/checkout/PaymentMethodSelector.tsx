'use client'

interface PaymentMethodProps {
	onSelect: (method: string) => void
}

const PaymentMethodSelector = ({ onSelect }: PaymentMethodProps) => {
	const paymentMethods = ['Credit Card', 'PayPal', 'Apple Pay']

	return (
		<div className='space-y-2'>
			<h2 className='text-lg font-semibold text-gray-800'>
				Select Payment Method
			</h2>
			{paymentMethods.map(method => (
				<button
					key={method}
					onClick={() => onSelect(method)}
					className='w-full border px-4 py-2 rounded-lg hover:bg-gray-100'
				>
					{method}
				</button>
			))}
		</div>
	)
}

export default PaymentMethodSelector
