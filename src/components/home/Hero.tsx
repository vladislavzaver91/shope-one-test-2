'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const bannerImages = [
	{
		name: 'banner_1',
		href: '/banner_1.png',
		title: 'Умная колонка',
		discount: 'Скидка 30%',
	},
	{
		name: 'banner_2',
		href: '/laptop.png',
		title: 'Монитор',
		discount: 'Скидка 25%',
	},
	{
		name: 'banner_3',
		href: '/pc.png',
		title: 'Ноутбук',
		discount: 'Скидка 10%',
	},
]

const Hero = () => {
	return (
		<div className='relative'>
			<Swiper
				modules={[Navigation]}
				spaceBetween={40}
				loop={true}
				slidesPerView={1}
				navigation={{
					nextEl: '.banner-btn-next',
					prevEl: '.banner-btn-prev',
				}}
				className='rounded-lg overflow-hidden h-64'
			>
				{bannerImages.map(bannerImg => (
					<SwiperSlide key={bannerImg.name}>
						<div className='flex gap-10 items-center justify-center rounded-lg w-full h-full bg-[#0c0c0c]'>
							<div>
								<h2 className='text-white text-4xl font-medium tracking-wider'>
									{bannerImg.title}
								</h2>
								<p className='text text-yellow-300 text-3xl font-normal tracking-wider'>
									{bannerImg.discount}
								</p>
							</div>
							<div className='relative top-5 w-96 h-64'>
								<Image
									src={bannerImg.href}
									alt={bannerImg.name}
									fill
									className='w-full h-full object-scale-down object-center'
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<button className='banner-btn-next z-10 absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-3 border border-white rounded-full shadow-md hover:text-gray-400 hover:border-gray-400 transition-all cursor-pointer'>
				<ChevronRight />
			</button>
			<button className='banner-btn-prev z-10 absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-3 border border-white rounded-full shadow-md hover:text-gray-400 hover:border-gray-400  transition-all cursor-pointer;'>
				<ChevronLeft />
			</button>
		</div>
	)
}

export default Hero
