'use client'

import { CATEGORY_ITEMS } from '@/helpers/variables/categories'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Hero = () => {
	return (
		<div className='relative max-w-4xl pb-16 md:px-16 md:pb-0 mx-auto'>
			<Swiper
				modules={[Navigation]}
				loop={true}
				slidesPerView={1.2}
				spaceBetween={10}
				breakpoints={{
					768: {
						slidesPerView: 1,
						spaceBetween: 0,
					},
				}}
				centeredSlides={true}
				navigation={{
					nextEl: '.banner-btn-next',
					prevEl: '.banner-btn-prev',
				}}
				className='rounded-lg overflow-hidden h-64'
			>
				{CATEGORY_ITEMS.map(category => (
					<SwiperSlide key={category.title}>
						<div
							className='flex gap-6 items-center justify-center rounded-[var(--border-info-card)] w-full h-full'
							style={{ background: 'var(--accent-gradient)' }}
						>
							<div className='w-2/3 pl-8 space-y-2'>
								<h2 className='text-white text-xl md:text-3xl font-medium tracking-wider'>
									{category.title}
								</h2>
								<p className='text text-yellow-300 text-lg md:text-2xl font-normal tracking-wider'>
									{category.descr}
								</p>
							</div>
							<div className='relative w-1/3 h-64'>
								<Image
									src={category.image}
									alt={category.title}
									fill
									className='w-full h-full object-contain object-center'
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<button className='banner-btn-next z-10 absolute top-72 md:top-1/2 right-1/3 md:right-0 transform -translate-y-1/2 text-[#0c0c0c] p-3 border border-[#0c0c0c] rounded-full shadow-md hover:text-gray-600 hover:border-gray-600 transition-all cursor-pointer'>
				<ChevronRight />
			</button>
			<button className='banner-btn-prev z-10 absolute top-72 md:top-1/2 left-1/3 md:left-0 transform -translate-y-1/2 text-[#0c0c0c] p-3 border border-[#0c0c0c] rounded-full shadow-md hover:text-gray-600 hover:border-gray-600  transition-all cursor-pointer;'>
				<ChevronLeft />
			</button>
		</div>
	)
}

export default Hero
