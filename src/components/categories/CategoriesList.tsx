'use client'

import { CategoryItems } from '@/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import 'react-loading-skeleton/dist/skeleton.css'

interface CategoryListProps {
	categories: CategoryItems[]
	onClick: (category: string) => void
}

const CategoriesList = ({ categories, onClick }: CategoryListProps) => {
	return (
		<div className='p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{categories.map((category, index) => (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							ease: 'easeOut',
							delay: index * 0.1,
						}}
						key={index}
						className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group h-full p-4 cursor-pointer'
						onClick={() => onClick(category.title)}
					>
						<div className='relative w-full h-40'>
							<Image
								src={category.image}
								alt={category.title}
								fill
								className='object-contain object-center group-hover:scale-105 transition-transform duration-300'
							/>
						</div>
						<h2 className='font-semibold text-[var(--font-prime-color)] mt-3 line-clamp-2'>
							{category.title}
						</h2>
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default CategoriesList
