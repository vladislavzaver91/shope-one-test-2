'use client'

import { Product } from '@/types'
import { getProductsFromLocalStorage } from '@/utils/localStorageProducts'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../home/ProductCard'

const ProductPopularSlider = () => {
	const products: Product[] = getProductsFromLocalStorage().slice(0, 8)

	return (
		<div className='max-w-full'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold mb-4'>Our popular products</h2>
				<div className='relative'>
					<button className='custom-btn-next'>
						<FaArrowRight />
					</button>
					<button className='custom-btn-prev mr-2'>
						<FaArrowLeft />
					</button>
				</div>
			</div>
			<div className='relative'>
				<Swiper
					modules={[Navigation]}
					spaceBetween={40}
					loop={true}
					navigation={{
						nextEl: '.custom-btn-next',
						prevEl: '.custom-btn-prev',
					}}
					className='rounded-lg overflow-hidden h-[420px]'
					breakpoints={{
						768: {
							slidesPerView: 2,
						},
						1024: {
							slidesPerView: 4,
						},
						0: {
							slidesPerView: 1,
						},
					}}
				>
					{products.map(product => (
						<SwiperSlide key={product.id}>
							<ProductCard product={product} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}

export default ProductPopularSlider
