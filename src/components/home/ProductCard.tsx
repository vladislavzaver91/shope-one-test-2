import { Product } from '@/types'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
	product: Product // Указываем, что компонент принимает объект product типа Product
}

const ProductCard = ({ product }: ProductCardProps) => {
	const imageSrc =
		product.images.length > 0 ? product.images[0] : '/placeholder.jpg'

	const imageUrl = imageSrc.startsWith('/') ? imageSrc : `/uploads/${imageSrc}`

	return (
		<div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group'>
			{/* Image Container */}
			<Link href={`/product/${product.id}`}>
				<div className='relative aspect-square'>
					<Image
						src={imageUrl}
						alt={product.title}
						fill
						className='object-cover group-hover:scale-105 transition-transform duration-300'
					/>
				</div>
			</Link>
			{/* Content */}
			<div className='p-4'>
				<div className='mb-2'>
					<span className='text-sm text-blue-600 font-medium'>
						{product.category}
					</span>
				</div>
				<h3 className='font-semibold text-gray-800 mb-2 line-clamp-2'>
					{product.title}
				</h3>
				<p className='text-sm text-gray-500 mb-4 line-clamp-2'>
					{product.description}
				</p>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-bold text-gray-900'>
						${product.price.toLocaleString()}
					</span>
					<button className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
						<ShoppingCart className='w-4 h-4' />
						Add
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
