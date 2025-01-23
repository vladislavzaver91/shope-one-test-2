import Pagination from '@mui/material/Pagination'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { mockProducts } from '../utils/mockData'

const ProductCard = dynamic(() => import('./ProductCard'), { ssr: false })

interface ProductListProps {
	filters: {
		category: string
		search: string
		price: string
		sort: string
	}
}

const ProductList = ({ filters }: ProductListProps) => {
	const [page, setPage] = useState<number>(1)
	const productsPerPage = 8

	const filteredProducts = useMemo(() => {
		return mockProducts
			.filter(product => {
				const matchesCategory =
					!filters.category || product.category === filters.category
				const matchesSearch =
					!filters.search ||
					product.name.toLowerCase().includes(filters.search.toLowerCase())
				const matchesPrice =
					!filters.price || product.price <= parseFloat(filters.price)
				return matchesCategory && matchesSearch && matchesPrice
			})
			.sort((a, b) => {
				if (filters.sort === 'price') {
					return a.price - b.price
				} else if (filters.sort === 'popularity') {
					return b.popularity - a.popularity
				}
				return 0
			})
	}, [filters])

	const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

	const currentPageProducts = useMemo(() => {
		const startIndex = (page - 1) * productsPerPage
		const endIndex = startIndex + productsPerPage
		return filteredProducts.slice(startIndex, endIndex)
	}, [page, filteredProducts])

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value)
	}

	return (
		<div className='p-4'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{currentPageProducts.map((product, index) => (
					<motion.div
						key={product.id}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
					>
						<ProductCard product={product} />
					</motion.div>
				))}
				{filteredProducts.length === 0 && (
					<p className='col-span-full text-center text-gray-500'>
						No products found.
					</p>
				)}
			</div>

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
