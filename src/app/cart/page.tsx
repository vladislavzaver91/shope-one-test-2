'use client'

import { useCart } from '@/helpers/context/CartContext'
import Image from 'next/image'

export default function CartPage() {
	const { cart, updateQuantity, removeFromCart } = useCart()

	const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

	return (
		<div className='max-w-4xl mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Cart</h1>
			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<ul className='space-y-4'>
						{cart.map(item => (
							<li
								key={item.id}
								className='flex flex-col md:flex-row items-center justify-between border-b pb-4 gap-4'
							>
								<div className='relative flex-shrink-0 w-24 h-24'>
									<Image
										src={item.image}
										alt={item.name}
										fill
										className='w-full h-full object-cover object-center rounded-lg shadow-md'
									/>
								</div>
								<div className='flex flex-col md:flex-row justify-between flex-1 md:items-center'>
									<div className='mb-2 md:mb-0 md:mr-4'>
										<p className='font-bold'>{item.name}</p>
										<p className='text-gray-600'>${item.price}</p>
									</div>

									<div className='flex items-center space-x-4'>
										<input
											type='number'
											value={item.quantity}
											min={1}
											onChange={e =>
												updateQuantity(item.id, Number(e.target.value))
											}
											className='w-16 border border-gray-300 rounded-lg text-center'
										/>
										<button
											onClick={() => removeFromCart(item.id)}
											className='text-red-600 hover:underline'
										>
											Remove
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>

					<div className='mt-6 text-right'>
						<p className='text-lg font-bold'>Subtotal: ${total.toFixed(2)}</p>
						<button className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
							Checkout
						</button>
					</div>
				</>
			)}
		</div>
	)
}
