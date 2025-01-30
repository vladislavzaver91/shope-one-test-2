// AdminPage.js
'use client'

import OrderManagement from '@/components/admin/OrderManagement'
import ProductManagement from '@/components/admin/ProductManagement'
import { Order, Product } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminPage() {
	const [products, setProducts] = useState<Product[]>([])
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch('/api/users/me', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				})

				if (!response.ok) {
					if (response.status === 401 || response.status === 403) {
						router.push('/login')
					}
					throw new Error('Failed to fetch user')
				}

				const user = await response.json()

				if (user.type !== 'Admin') {
					router.push('/')
				} else {
					setLoading(false)
				}
			} catch (error) {
				console.error('Error fetching user:', error)
				router.push('/login')
			}
		}

		fetchUser()
	}, [router])

	useEffect(() => {
		if (!loading) {
			const fetchProducts = async () => {
				try {
					const response = await fetch('/api/products')
					if (response.ok) {
						const data = await response.json()
						setProducts(data.products)
					}
				} catch (error) {
					console.error('Error fetching products:', error)
				}
			}

			const fetchOrders = async () => {
				try {
					const response = await fetch('/api/order')
					if (response.ok) {
						const data = await response.json()
						setOrders(data.orders)
					}
				} catch (error) {
					console.error('Error fetching orders:', error)
				}
			}

			fetchProducts()
			fetchOrders()
		}
	}, [loading])

	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<div className='min-h-screen bg-gray-100 p-4 text-gray-900'>
			<h1 className='text-3xl font-bold text-center mb-6'>Admin Panel</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				<ProductManagement products={products} />
				<OrderManagement orders={orders} />
			</div>
		</div>
	)
}
