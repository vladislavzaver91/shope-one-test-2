'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import 'react-loading-skeleton/dist/skeleton.css'

const specialProducts = [
	{
		title: 'Digital Products: Convenience at Your Fingertips',
		desrc:
			'Digital solutions for your business and life. Templates, software, eBooks, and courses — instant delivery and 24/7 accessibility.',
		href: '/digital-products.png',
	},
	{
		title: 'Physical Products: Quality You Can Feel',
		desrc:
			'Products crafted with attention to detail. Clothing, accessories, gadgets, and more — durable materials and fast delivery.',
		href: '/physical-products.png',
	},
]

const SpecialOffer = () => {
	return (
		<div className='p-4'>
			<h2
				className='tracking-widest text-xl font-medium  mb-6'
				style={{
					color: 'var(--font-color)',
				}}
			>
				Special offers
			</h2>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 p-2'>
				{specialProducts.map((product, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							ease: 'easeOut',
							delay: index * 0.1,
						}}
						className='flex items-center pr-4 rounded-[var(--border-info-card)] h-52'
						style={{ background: 'var(--accent-gradient)' }}
					>
						<div className='space-y-2 w-2/3 px-4'>
							<h3 className='text-xl font-semibold text-white'>
								{product.title}
							</h3>
							<p className='text-lg font-normal text-white'>{product.desrc}</p>
						</div>
						<div className='relative w-1/3 h-full'>
							<Image
								src={product.href}
								alt={product.title}
								fill
								className='w-full h-full object-center object-contain'
							/>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default SpecialOffer
