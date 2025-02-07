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
	const [editingProduct, setEditingProduct] = useState<Product | null>(null)
	const [currentPage, setCurrentPage] = useState(1)

	const filteredProducts = products.filter(product => {
		return Object.values(product).some(
			value =>
				value !== null &&
				value !== undefined &&
				value.toString().toLowerCase().includes(filter.toLowerCase())
		)
	})

	const handleCreateToggle = () => {
		setActivePage(activePage === 'list' ? 'create' : 'list')
		setEditingProduct(null)
	}

	const handleSaveProduct = (newProduct: Product) => {
		if (editingProduct) {
			setProducts(prev =>
				prev.map(product =>
					product.id === editingProduct.id ? newProduct : product
				)
			)
		} else {
			setProducts(prev => [...prev, newProduct])
		}

		setActivePage('list')
		setEditingProduct(null)
	}

	const handleEditProduct = (productId: string) => {
		const productToEdit = products.find(product => product.id === productId)
		console.log('Editing product ID:', productId)
		console.log('Found product:', productToEdit)
		if (productToEdit) {
			setEditingProduct({ ...productToEdit })
			setActivePage('create')
		}
	}

	const handleDeleteProduct = async (productId: string) => {
		try {
			await fetch(`/api/products/${productId}`, { method: 'DELETE' })
			setProducts(products.filter(product => product.id !== productId))
			const totalPages = Math.ceil(products.length / 12)

			if (totalPages < currentPage) {
				setCurrentPage(totalPages > 0 ? totalPages : 1)
			} else {
				setCurrentPage(currentPage)
			}
		} catch (error) {
			console.error('Error deleting product:', error)
		}
		window.location.reload()
	}

	console.log('products :', products)
	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.3 }}
			className='p-6'
		>
			<div className='mb-8 flex items-center justify-between'>
				<input
					type='text'
					value={filter}
					onChange={e => setFilter(e.target.value)}
					placeholder='Search...'
					className='w-36 md:w-56 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					onClick={handleCreateToggle}
					className='bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors'
				>
					{activePage === 'list' ? 'Create Product' : 'Back to List'}
				</button>
			</div>

			{activePage === 'list' ? (
				<ProductList
					products={filteredProducts}
					onEdit={handleEditProduct}
					onDelete={handleDeleteProduct}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			) : (
				<CreateProductForm
					onCreate={handleSaveProduct}
					onCancel={handleCreateToggle}
					editingProduct={editingProduct}
				/>
			)}
		</motion.div>
	)
}

export default ProductPage
