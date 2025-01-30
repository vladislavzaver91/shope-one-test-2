'use client'

import { Address, Order } from '@/types'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const UserInfoForm = dynamic(
	() => import('../../components/user-account/UserInfoForm'),
	{
		ssr: false,
	}
)
const AddressManager = dynamic(
	() => import('../../components/user-account/AddressManager'),
	{
		ssr: false,
	}
)
const OrderHistory = dynamic(
	() => import('../../components/user-account/OrderHistory'),
	{
		ssr: false,
	}
)

export default function UserAccountPage() {
	const [orders, setOrders] = useState<Order[]>([]) // order history
	const [addresses, setAddresses] = useState<Address[]>([]) // addresses

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch('/api/orders')
				if (response.ok) {
					const data = await response.json()
					setOrders(data.orders)
				}
			} catch (error) {
				console.error('Error fetching orders:', error)
			}
		}

		const fetchAddresses = async () => {
			try {
				const userId = localStorage.getItem('userId')
				if (!userId) {
					console.log('User ID not found')
					return
				}
				const response = await fetch('/api/shipping/addresses', {
					method: 'GET',
					headers: {
						'user-id': userId,
					},
				})
				if (response.ok) {
					const data = await response.json()
					console.log(data)
					setAddresses(data)
				}
			} catch (error) {
				console.error('Error fetching addresses:', error)
			}
		}

		fetchOrders()
		fetchAddresses()
	}, [])

	const handleUpdateAddresses = (newAddress: Address) => {
		const updatedAddresses = [...addresses, newAddress]
		setAddresses(updatedAddresses)
	}

	return (
		<div className='max-w-2xl mx-auto p-6 space-y-8'>
			<h1 className='text-2xl text-center font-bold text-gray-800'>
				Personal account
			</h1>
			<UserInfoForm />
			<AddressManager addresses={addresses} onUpdate={handleUpdateAddresses} />
			<OrderHistory orders={orders} />
		</div>
	)
}
