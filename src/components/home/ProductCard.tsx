import { useCart } from '@/helpers/context/CartContext'
import { truncateDescription } from '@/helpers/functions/truncateDescription'
import { Product } from '@/types'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ProductCardProps {
	product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
	const { addToCart, cart, removeFromCart } = useCart()

	// Check if the product is already in the cart
	const [isInCart, setIsInCart] = useState(false)

	useEffect(() => {
		const isItemInCart = cart.some(item => item.id === product.id)
		setIsInCart(isItemInCart)
	}, [cart, product.id])

	const handleToggleCart = () => {
		if (isInCart) {
			console.log(`${product.title} removed from cart!`)
			removeFromCart(product.id)
		} else {
			addToCart(product, 1)
			console.log(`${product.title} added to cart!`)
		}
	}

	const imageSrc =
		product.images.length > 0 ? product.images[0] : '/placeholder.jpg'

	const imageUrl = imageSrc.startsWith('/') ? imageSrc : `/uploads/${imageSrc}`

	return (
		<div className='bg-white rounded-[var(--border-product-card)] shadow-sm border border-gray-100 overflow-hidden group h-full'>
			{/* Image Container */}
			<Link href={`/product/${product.id}`}>
				<div className='relative aspect-square max-sm:h-96 w-full'>
					<Image
						src={imageUrl}
						alt={product.title}
						fill
						className='object-contain group-hover:scale-105 transition-transform duration-300'
					/>
				</div>
			</Link>

			{/* Content */}
			<div className='p-4'>
				<div className='mb-2'>
					<span className='text-sm text-[var(--accent-color)] font-medium'>
						{product.category}
					</span>
				</div>
				<h3 className='font-semibold text-[var(--font-color)] mb-2 line-clamp-2'>
					{product.title}
				</h3>
				<p className='text-sm sm:h-10 text-gray-500 mb-4 line-clamp-2'>
					{truncateDescription(product.description, 5)}
				</p>

				{/* Price and Add to Cart Button */}
				<div className='flex items-center justify-between flex-col'>
					<span className='text-lg font-bold text-[var(--font-color)]'>
						${product.price.toLocaleString()}
					</span>
					<button
						onClick={handleToggleCart}
						className={`flex items-center gap-2 px-4 py-2 rounded-[var(--border-btn)] ${
							isInCart ? 'bg-gray-400' : 'bg-[var(--accent-color)] text-white'
						}`}
					>
						<ShoppingCart className='w-4 h-4' />
						{isInCart ? 'Added' : 'Add'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
