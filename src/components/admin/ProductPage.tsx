'use client'

import { Product } from '@/types'
import { motion } from 'framer-motion'
import { SetStateAction, useState } from 'react'
import CreateProductForm from './CreateProductForm'
import ProductList from './ProductList'

interface ProductPageProps {
	products: Product[]
	setProducts: React.Dispatch<SetStateAction<Product[]>>
}

const ProductPage = ({ products, setProducts }: ProductPageProps) => {
	const [activePage, setActivePage] = useState<'list' | 'create'>('list')
	const [filter, setFilter] = useState('')

	const filteredProducts = products.filter(product => {
		return (
			product.title.toLowerCase().includes(filter.toLowerCase()) ||
			product.id.toString().includes(filter) ||
			product.type.toLowerCase().includes(filter.toLowerCase())
		)
	})

	const handleCreateToggle = () => {
		setActivePage(activePage === 'list' ? 'create' : 'list')
	}

	const handleCreateProduct = (newProduct: {
		name: string
		id: string
		type: string
	}) => {
		setProducts([...products, newProduct])
		setActivePage('list')
	}

	const handleEditProduct = (productId: string) => {
		console.log('Edit product with ID:', productId)
	}

	const handleDeleteProduct = (productId: string) => {
		setProducts(products.filter(product => product.id !== productId))
	}

	console.log('products :', products)
	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3 }}
			className='p-6'
		>
			<div className='mb-4 flex items-center justify-between'>
				<input
					type='text'
					value={filter}
					onChange={e => setFilter(e.target.value)}
					placeholder='Search by name, ID or type'
					className='p-2 border border-gray-300 rounded-lg'
				/>
				<button
					onClick={handleCreateToggle}
					className='bg-blue-500 text-white p-2 rounded-lg'
				>
					{activePage === 'list' ? 'Create Product' : 'Back to List'}
				</button>
			</div>

			{activePage === 'list' ? (
				<ProductList
					products={filteredProducts}
					onEdit={handleEditProduct}
					onDelete={handleDeleteProduct}
				/>
			) : (
				<CreateProductForm
					onCreate={handleCreateProduct}
					onCancel={handleCreateToggle}
				/>
			)}
		</motion.div>
	)
}

export default ProductPage
