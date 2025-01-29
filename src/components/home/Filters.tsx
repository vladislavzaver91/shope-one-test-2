/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Sliders } from 'lucide-react'
import { useState } from 'react'

interface FiltersProps {
	onFilter: (key: string, value: any) => void
	filters: {
		category: string
		type: ('Digital' | 'Physical')[]
		minPrice: string
		maxPrice: string
		sort: string
	}
}

const Filters = ({ onFilter, filters }: FiltersProps) => {
	const [showFilters, setShowFilters] = useState<boolean>(false)

	return (
		<>
			{/* mob & tab width */}
			<div className='block lg:hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-3'>
				<div
					className='flex items-center justify-between cursor-pointer'
					onClick={() => setShowFilters(prev => !prev)}
				>
					<div className='flex gap-2'>
						<Sliders className='w-5 h-5 text-blue-600' />
						<h3 className='text-lg font-semibold'>Filters</h3>
					</div>

					{!showFilters ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
				</div>

				{/* filters panel */}
				<AnimatePresence>
					{showFilters && (
						<motion.div
							className='space-y-6 mt-3'
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							{/* Categories */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Category
								</label>
								<select
									className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
									onChange={e => onFilter('category', e.target.value)}
								>
									<option value=''>All Categories</option>
									<option value='Electronics'>Electronics</option>
									<option value='Books'>Books</option>
									<option value='Software'>Software</option>
								</select>
							</div>

							{/* Type */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Type
								</label>
								<div className='space-y-2'>
									<label className='flex items-center gap-2'>
										<input
											type='checkbox'
											checked={filters.type.includes('Digital')}
											onChange={() => onFilter('type', 'Digital')}
											className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
										/>
										Digital
									</label>
									<label className='flex items-center gap-2'>
										<input
											type='checkbox'
											checked={filters.type.includes('Physical')}
											onChange={() => onFilter('type', 'Physical')}
											className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
										/>
										Physical
									</label>
								</div>
							</div>

							{/* Min Price */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Min Price
								</label>
								<input
									type='number'
									placeholder='Enter minimum price'
									className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
									onChange={e => onFilter('minPrice', e.target.value)}
								/>
							</div>

							{/* Max Price */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Max Price
								</label>
								<input
									type='number'
									placeholder='Enter maximum price'
									className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
									onChange={e => onFilter('maxPrice', e.target.value)}
								/>
							</div>

							{/* Sort */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Sort By
								</label>
								<select
									className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
									onChange={e => onFilter('sort', e.target.value)}
								>
									<option value=''>Featured</option>
									<option value='price'>Price: Low to High</option>
									<option value='price-desc'>Price: High to Low</option>
									<option value='popularity'>Most Popular</option>
									<option value='newest'>Newest First</option>
								</select>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* desktop width */}
			<div className='hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
				<div className='flex items-center gap-2 mb-6'>
					<Sliders className='w-5 h-5 text-blue-600' />
					<h3 className='text-lg font-semibold'>Filters</h3>
				</div>

				<div className='space-y-6'>
					{/* Categories */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Category
						</label>
						<select
							className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
							onChange={e => onFilter('category', e.target.value)}
						>
							<option value=''>All Categories</option>
							<option value='Electronics'>Electronics</option>
							<option value='Books'>Books</option>
							<option value='Software'>Software</option>
						</select>
					</div>

					{/* Type */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Type
						</label>
						<div className='space-y-2'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={filters.type.includes('Digital')}
									onChange={() => onFilter('type', 'Digital')}
									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								Digital
							</label>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={filters.type.includes('Physical')}
									onChange={() => onFilter('type', 'Physical')}
									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								Physical
							</label>
						</div>
					</div>

					{/* Min Price */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Min Price
						</label>
						<input
							type='number'
							placeholder='Enter minimum price'
							className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
							onChange={e => onFilter('minPrice', e.target.value)}
						/>
					</div>

					{/* Max Price */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Max Price
						</label>
						<input
							type='number'
							placeholder='Enter maximum price'
							className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
							onChange={e => onFilter('maxPrice', e.target.value)}
						/>
					</div>

					{/* Sort */}
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Sort By
						</label>
						<select
							className='w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
							onChange={e => onFilter('sort', e.target.value)}
						>
							<option value=''>Featured</option>
							<option value='price'>Price: Low to High</option>
							<option value='price-desc'>Price: High to Low</option>
							<option value='popularity'>Most Popular</option>
							<option value='newest'>Newest First</option>
						</select>
					</div>
				</div>
			</div>
		</>
	)
}

export default Filters
