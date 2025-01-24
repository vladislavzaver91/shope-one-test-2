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

const OrderHistory = dynamic(
	() => import('../../components/user-account/OrderHistory'),
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

export default function UserAccountPage() {
	const [orders, setOrders] = useState<Order[]>([]) // order history
	const [addresses, setAddresses] = useState<Address[]>([]) // addresses

	useEffect(() => {
		const savedOrders = localStorage.getItem('orders')
		const savedAddresses = localStorage.getItem('addresses')
		if (savedOrders) setOrders(JSON.parse(savedOrders))
		if (savedAddresses) setAddresses(JSON.parse(savedAddresses))
	}, [])

	const handleUpdateAddresses = (newAddress: Address) => {
		const updatedAddresses = [...addresses, newAddress]
		setAddresses(updatedAddresses)
		localStorage.setItem('addresses', JSON.stringify(updatedAddresses))
	}

	return (
		<div className='max-w-5xl mx-auto p-6 space-y-8'>
			<h1 className='text-2xl text-center font-bold text-gray-800'>
				Personal account
			</h1>
			<UserInfoForm />
			<AddressManager addresses={addresses} onUpdate={handleUpdateAddresses} />
			<OrderHistory orders={orders} />
		</div>
	)
}
