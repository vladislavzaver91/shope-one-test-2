'use client'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const catalogItems = [
	{
		name: 'Phones',
		href: '/phones.png',
	},
	{
		name: 'Laptops',
		href: '/laptop.png',
	},
	{
		name: 'PC',
		href: '/pc.png',
	},
	{
		name: 'TV',
		href: '/tv.png',
	},
	{
		name: 'Speakers',
		href: '/speakers.png',
	},
	{
		name: 'Gadgets',
		href: '/phones.png',
	},
	{
		name: 'Monitors',
		href: '/tv.png',
	},
]

const Catalog = () => {
	return (
		<div className='relative'>
			<Swiper
				modules={[Navigation]}
				spaceBetween={8}
				loop={true}
				centeredSlides={false}
				navigation={{
					nextEl: '.catalog-btn-next',
				}}
				breakpoints={{
					0: {
						slidesPerView: 1.5,
						spaceBetween: 6,
					},
					420: {
						slidesPerView: 2.5,
						spaceBetween: 12,
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 16,
					},
					1024: {
						slidesPerView: 5,
						spaceBetween: 16,
					},
					1240: {
						slidesPerView: 6,
						spaceBetween: 16,
					},
				}}
				className='rounded-lg overflow-hidden'
			>
				{catalogItems.map((item, index) => (
					<SwiperSlide key={index}>
						<div className='space-y-6 w-full h-full'>
							<div className='relative bg-[#bcc5ff] rounded-lg top-5 w-full max-w-[200] h-[212px]'>
								<Image
									src={item.href}
									alt={item.name}
									fill
									className='w-full h-full object-scale-down object-center'
								/>
							</div>
							<h3 className='text-[#0c0c0c] text-center text-lg font-light tracking-wider'>
								{item.name}
							</h3>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<button className='catalog-btn-next z-10 absolute top-1/2 right-0 transform -translate-y-1/2 text-[#0c0c0c] p-3 border border-[#0c0c0c] rounded-full shadow-md hover:text-gray-800 hover:border-gray-800 transition-all cursor-pointer'>
				<ChevronRight />
			</button>
		</div>
	)
}

export default Catalog
