'use client'

import { useCart } from '@/helpers/context/CartContext'
import { Product } from '@/utils/mockData'
import Image from 'next/image'
import { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface ProductItemProps {
	product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
	const [quantity, setQuantity] = useState(1)
	const { addToCart } = useCart()

	const handleAddToCart = () => {
		addToCart(product, quantity)
		alert(`${product.name} added to cart!`)
	}

	return (
		<div className='max-w-4xl mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>{product.name}</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* imgs gallery */}
				<div className='relative'>
					<Swiper
						modules={[Navigation]}
						pagination={{ clickable: true }}
						spaceBetween={10}
						slidesPerView={1}
						navigation={{
							nextEl: '.custom-btn-next',
							prevEl: '.custom-btn-prev',
						}}
						className='rounded-lg overflow-hidden shadow-lg'
					>
						{product.images?.map((image, index) => (
							<SwiperSlide key={index}>
								<div className='relative w-full h-60 aspect-square'>
									<Image
										src={image}
										alt={`Product Image ${index + 1}`}
										fill
										className='w-full h-auto object-cover object-center'
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<div className='flex justify-between absolute bottom-32 md:bottom-14 w-full'>
						<button className='custom-btn-prev'>
							<FaArrowLeft size={20} />
						</button>
						<button className='custom-btn-next'>
							<FaArrowRight size={20} />
						</button>
					</div>
				</div>

				{/* product details */}
				<div>
					<p className='text-gray-700 mb-4'>{product.description}</p>
					<ul className='mb-6'>
						<li>
							<strong>Category:</strong> {product.category}
						</li>
						<li>
							<strong>Type:</strong> {product.type}
						</li>
						<li>
							<strong>Price:</strong> ${product.price}
						</li>
					</ul>

					{/* quantity */}
					<div className='flex items-center mb-4'>
						<label htmlFor='quantity' className='mr-4'>
							Quantity:
						</label>
						<input
							type='number'
							id='quantity'
							value={quantity}
							min={1}
							onChange={e => setQuantity(Number(e.target.value))}
							className='w-16 border border-gray-300 rounded-lg text-center'
						/>
					</div>

					{/* btns */}
					<div className='flex space-x-4'>
						<button
							onClick={handleAddToCart}
							className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
						>
							Add to Cart
						</button>
						<button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
							Buy Now
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductItem
