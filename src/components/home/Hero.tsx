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
		title: 'E-books',
		descr:
			'Discover a vast collection of e-books across all genres. Instant access, no shipping required.',
		image: '/ebooks.png',
	},
	{
		title: 'Software',
		descr:
			'From productivity tools to creative software, get the apps you need to achieve your goals.',
		image: '/software.png',
	},
	{
		title: 'Music',
		descr:
			'Download high-quality music tracks or albums. Your favorite tunes, always with you.',
		image: '/music.png',
	},
	{
		title: 'Electronics',
		descr:
			'Upgrade your tech with the latest gadgets and devices for work or entertainment.',
		image: '/electronics.png',
	},
	{
		title: 'Clothing',
		descr:
			'Stay stylish with our premium clothing selection. Fashion for every season and occasion.',
		image: '/clothing.png',
	},
	{
		title: 'Home Goods',
		descr:
			'Transform your space with high-quality home essentials and decor. Comfort meets design.',
		image: '/homegoods.png',
	},
]

const Hero = () => {
	return (
		<div className='relative max-w-3xl mx-auto'>
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
					<SwiperSlide key={bannerImg.title}>
						<div className='flex gap-6 items-center justify-center rounded-lg w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600'>
							<div className='w-2/3 pl-8 space-y-2'>
								<h2 className='text-white text-xl md:text-3xl font-medium tracking-wider'>
									{bannerImg.title}
								</h2>
								<p className='text text-yellow-300 text-lg md:text-2xl font-normal tracking-wider'>
									{bannerImg.descr}
								</p>
							</div>
							<div className='relative w-1/3 h-64'>
								<Image
									src={bannerImg.image}
									alt={bannerImg.title}
									fill
									className='w-full h-full object-contain object-center'
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<button className='banner-btn-next z-10 absolute top-1/2 -right-16 transform -translate-y-1/2 text-[#0c0c0c] p-3 border border-[#0c0c0c] rounded-full shadow-md hover:text-gray-600 hover:border-gray-600 transition-all cursor-pointer'>
				<ChevronRight />
			</button>
			<button className='banner-btn-prev z-10 absolute top-1/2 -left-16 transform -translate-y-1/2 text-[#0c0c0c] p-3 border border-[#0c0c0c] rounded-full shadow-md hover:text-gray-600 hover:border-gray-600  transition-all cursor-pointer;'>
				<ChevronLeft />
			</button>
		</div>
	)
}

export default Hero
