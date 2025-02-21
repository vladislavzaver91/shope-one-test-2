'use client'

import { Product } from '@/types'
import Pagination from '@mui/material/Pagination'
import axios from 'axios'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductCard = dynamic(() => import('./ProductCard'), { ssr: false })

interface ProductListProps {
	filters: {
		category: string
		attributes: string[]
		search: string
		minPrice: string
		maxPrice: string
		sort: string
	}
}

const ProductList = ({ filters }: ProductListProps) => {
	const [products, setProducts] = useState<Product[]>([])
	const [page, setPage] = useState<number>(1)
	const [loading, setLoading] = useState(true)
	const productsPerPage = 12

	const fetchProducts = useCallback(async () => {
		try {
			setLoading(true)
			const response = await axios.post('/api/products/filter', {
				filters,
				page,
				limit: productsPerPage,
			})
			setProducts(response.data.products)
		} catch (error) {
			console.error('Error fetching products:', error)
		} finally {
			setLoading(false)
		}
	}, [filters, page, productsPerPage]) // Добавляем зависимости

	useEffect(() => {
		fetchProducts()
	}, [filters, page, fetchProducts])

	const totalPages = Math.ceil(products.length / productsPerPage)

	const currentPageProducts = useMemo(() => {
		let filteredProducts = products

		if (filters.minPrice) {
			const minPrice = parseFloat(filters.minPrice)
			filteredProducts = filteredProducts.filter(
				product => product.price >= minPrice
			)
		}

		if (filters.maxPrice) {
			const maxPrice = parseFloat(filters.maxPrice)
			filteredProducts = filteredProducts.filter(
				product => product.price <= maxPrice
			)
		}

		if (filters.category) {
			filteredProducts = filteredProducts.filter(
				product => product.category === filters.category
			)
		}

		if (filters.attributes.length > 0) {
			filteredProducts = filteredProducts.filter(product =>
				product.attributes?.some(attr => filters.attributes.includes(attr))
			)
		}

		const startIndex = (page - 1) * productsPerPage
		const endIndex = startIndex + productsPerPage

		return filteredProducts.slice(startIndex, endIndex)
	}, [page, products, filters])

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value)
	}

	return (
		<div className='p-4'>
			{loading ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{Array.from({ length: productsPerPage }).map((_, index) => (
						<div key={index} className='p-4'>
							<Skeleton height={200} className='mb-4' />
							<Skeleton width='60%' className='mb-2' />
							<Skeleton width='80%' className='mb-2' />
							<Skeleton width='40%' />
						</div>
					))}
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{currentPageProducts.map((product, index) => (
						<motion.div
							key={product.id}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								ease: 'easeOut',
								delay: index * 0.1,
							}}
						>
							<ProductCard product={product} />
						</motion.div>
					))}
					{products.length === 0 && (
						<p className='col-span-full text-center text-gray-500'>
							No products found.
						</p>
					)}
				</div>
			)}

			<div className='flex justify-center mt-6'>
				{totalPages > 1 && (
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color='primary'
						size='large'
					/>
				)}
			</div>
		</div>
	)
}

export default ProductList
