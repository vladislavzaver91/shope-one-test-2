'use client'

import useModal from '@/helpers/hooks/useModal'
import { Product } from '@/types'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SearchBarProps {
	onSearch: (value: string) => void
	products: Product[]
	isLoading: boolean
}

const SearchBar = ({ onSearch, products, isLoading }: SearchBarProps) => {
	const [searchValue, setSearchValue] = useState('')
	const { isOpen, setIsOpen } = useModal()

	useEffect(() => {
		const debounce = setTimeout(() => {
			onSearch(searchValue)
		}, 300)

		return () => clearTimeout(debounce)
	}, [searchValue, onSearch])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const handleFocus = () => {
		if (window.innerWidth < 768) setIsOpen(true)
	}

	const closeMobileSearch = () => {
		setIsOpen(false)
		setSearchValue('')
	}

	return (
		<>
			{/* desktop search */}
			<div className='relative hidden md:block'>
				<input
					type='text'
					placeholder='Search products...'
					value={searchValue}
					onChange={handleInputChange}
					className='max-w-24 sm:max-w-48 pl-8 sm:pl-12 pr-2 sm:pr-4 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
				/>
				<Search className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />

				{searchValue && (
					<div className='absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md mt-2 max-h-64 overflow-y-auto z-50'>
						{isLoading ? (
							<p className='p-4 text-gray-500'>Loading...</p>
						) : products.length > 0 ? (
							<ul>
								{products.map(product => (
									<li
										key={product.id}
										className='p-4 hover:bg-gray-100 cursor-pointer'
									>
										{product.title}
									</li>
								))}
							</ul>
						) : (
							<p className='p-4 text-gray-500'>No products found</p>
						)}
					</div>
				)}
			</div>

			{/* mobile search */}
			<div className='relative md:hidden'>
				<input
					type='text'
					placeholder='Search...'
					value={searchValue}
					onChange={handleInputChange}
					onFocus={handleFocus}
					className='w-40 px-8 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
				/>
				<Search className='absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
			</div>

			{/* backdrop */}
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col justify-start items-center z-50'
					onClick={closeMobileSearch}
				>
					<motion.div
						initial={{ y: '100%' }}
						animate={{ y: '0%' }}
						exit={{ y: '100%' }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className='bg-white w-full max-w-md p-6 rounded-lg shadow-lg'
						onClick={e => e.stopPropagation()}
					>
						<div className='flex justify-between items-center mb-4'>
							<h2 className='text-lg font-semibold'>Search</h2>
							<button
								onClick={closeMobileSearch}
								className='text-gray-500 hover:text-gray-700'
							>
								<X size={24} />
							</button>
						</div>
						<input
							type='text'
							placeholder='Search products...'
							value={searchValue}
							onChange={handleInputChange}
							autoFocus
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none'
						/>
						{searchValue && (
							<div className='mt-4 max-h-64 overflow-y-auto border-t border-gray-200'>
								{isLoading ? (
									<p className='p-4 text-gray-500'>Loading...</p>
								) : products.length > 0 ? (
									<ul>
										{products.map(product => (
											<li
												key={product.id}
												className='p-4 hover:bg-gray-100 cursor-pointer'
											>
												{product.title}
											</li>
										))}
									</ul>
								) : (
									<p className='p-4 text-gray-500'>No products found</p>
								)}
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</>
	)
}

export default SearchBar
