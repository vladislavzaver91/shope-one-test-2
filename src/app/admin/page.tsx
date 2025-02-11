// AdminPage.js
'use client'

import AdminSidebar from '@/components/admin/AdminSidebar'
import OrderList from '@/components/admin/OrderList'
import ProductPage from '@/components/admin/ProductPage'
import { Order, Product } from '@/types'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminPage() {
	const [products, setProducts] = useState<Product[]>([])
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)
	const [activePage, setActivePage] = useState<
		'products' | 'orders' | 'statistics'
	>('products')
	const router = useRouter()

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem('accessToken')
			if (!token) {
				router.push('/login')
				return
			}

			try {
				const response = await fetch('/api/users/me', {
					headers: {
						Authorization: `Bearer ${token}`,
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
						console.log(data.products)
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
						if (data.orders && Array.isArray(data.orders)) {
							setOrders(data.orders)
							console.log(data.orders)
						} else {
							console.error('Invalid data format:', data)
						}
					}
				} catch (error) {
					console.error('Error fetching orders:', error)
				} finally {
					setLoading(false)
				}
			}

			fetchProducts()
			fetchOrders()
		}
	}, [loading])

	if (loading) {
		return <p className='text-center mt-10 text-gray-600'>Loading...</p>
	}

	return (
		<div className='flex min-h-screen bg-gray-100 text-gray-900'>
			<AdminSidebar activePage={activePage} setActivePage={setActivePage} />
			<motion.div
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.3 }}
				className='flex-1 p-6 pl-16 md:pl-20 xl:pl-28'
			>
				{activePage === 'products' && (
					<ProductPage products={products} setProducts={setProducts} />
				)}
				{activePage === 'orders' && <OrderList orders={orders} />}
			</motion.div>
		</div>
	)
}
