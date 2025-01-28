'use client'

import { Product } from '@/types'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SearchBarProps {
	onSearch: (value: string) => void
	products: Product[]
	isLoading: boolean
}

const SearchBar = ({ onSearch, products, isLoading }: SearchBarProps) => {
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		const debounce = setTimeout(() => {
			onSearch(searchValue)
		}, 300)

		return () => clearTimeout(debounce)
	}, [searchValue, onSearch])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	return (
		<div className='relative'>
			<input
				type='text'
				placeholder='Search products...'
				value={searchValue}
				onChange={handleInputChange}
				className='max-w-48 pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
			/>
			<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />

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
	)
}

export default SearchBar
