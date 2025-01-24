'use client'

import OrderManagement from '@/components/admin/OrderManagement'
import ProductManagement from '@/components/admin/ProductManagement'
import SalesAnalytics from '@/components/admin/SalesAnalytics'
import { Order, Product } from '@/types'
import { useEffect, useState } from 'react'
import mockData from '../../data/mockData.json'

export default function AdminPage() {
	const [products, setProducts] = useState<Product[]>([])
	const [orders, setOrders] = useState<Order[]>([])
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		const storedProducts = localStorage.getItem('products')
		if (!storedProducts) {
			localStorage.setItem('products', JSON.stringify(mockData))
		}
		setProducts(JSON.parse(localStorage.getItem('products') || '[]'))

		const storedOrders = localStorage.getItem('orders')
		if (!storedOrders) {
			localStorage.setItem('orders', JSON.stringify([]))
		}
		setOrders(JSON.parse(localStorage.getItem('orders') || '[]'))
	}, [])

	const addProduct = (product: Product) => {
		const updatedProducts = [...products, product]
		setProducts(updatedProducts)
		localStorage.setItem('products', JSON.stringify(updatedProducts))
	}

	const editProduct = (updatedProduct: Product) => {
		const updatedProducts = products.map(product =>
			product.id === updatedProduct.id ? updatedProduct : product
		)
		setProducts(updatedProducts)
		localStorage.setItem('products', JSON.stringify(updatedProducts))
		setIsEditing(false)
		setSelectedProduct(null)
	}

	const deleteProduct = (id: string) => {
		const updatedProducts = products.filter(product => product.id !== id)
		setProducts(updatedProducts)
		localStorage.setItem('products', JSON.stringify(updatedProducts))
	}

	return (
		<div className='min-h-screen bg-gray-100 p-4 text-gray-900'>
			<h1 className='text-3xl font-bold text-center mb-6'>Admin Panel</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				<ProductManagement
					products={products}
					addProduct={addProduct}
					editProduct={editProduct}
					deleteProduct={deleteProduct}
					selectedProduct={selectedProduct}
					setSelectedProduct={setSelectedProduct}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
				<OrderManagement orders={orders} />
				<SalesAnalytics />
			</div>
		</div>
	)
}
