import { Product } from '@/types'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductCard = dynamic(() => import('./ProductCard'), { ssr: false })

const Stock = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const productsPerPage = 4

	const fetchProducts = async () => {
		try {
			setLoading(true)
			const response = await axios.get('/api/products')
			setProducts(response.data.products)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching products:', error)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<div className='p-4'>
			<div className='mb-5 flex items-center justify-between'>
				<h2 className='tracking-widest text-xl font-medium text-black'>
					Stock
				</h2>
				<Link
					href='/'
					className='flex items-center gap-3 tracking-widest text-sm text-black'
				>
					<span>All stocks</span>
					<ChevronRight size={20} />
				</Link>
			</div>

			{loading ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
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
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{products.map((product, index) => (
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
		</div>
	)
}

export default Stock
