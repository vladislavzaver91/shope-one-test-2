import { motion } from 'framer-motion'
import Image from 'next/image'
import 'react-loading-skeleton/dist/skeleton.css'

const specialProducts = [
	{
		title: 'Оформите карту «Северяночка»',
		desrc: 'И получайте бонусы при покупке в магазинах и на сайте',
		href: '/special_1.png',
	},
	{
		title: 'Покупайте акционные товары',
		desrc: 'И получайте вдвое больше бонусов',
		href: '/special_2.png',
	},
]

const SpecialOffers = () => {
	return (
		<div className='p-4'>
			<h2 className='tracking-widest text-xl font-medium text-black mb-6'>
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
						className='flex items-center bg-[#bcc5ff] rounded-lg h-52'
					>
						<div className='space-y-2 px-6'>
							<h3 className='text-xl font-semibold text-black'>
								{product.title}
							</h3>
							<p className='text-lg font-normal text-black'>{product.desrc}</p>
						</div>
						<div className='relative w-1/2 h-full'>
							<Image
								src={product.href}
								alt={product.title}
								fill
								className='w-full h-full object-center object-scale-down'
							/>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default SpecialOffers
