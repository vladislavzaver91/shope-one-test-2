'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const ProductList = dynamic(() => import('../../components/ProductList'), {
	ssr: false,
})
const Filters = dynamic(() => import('../../components/Filters'), {
	ssr: false,
})
const SearchBar = dynamic(() => import('../../components/SearchBar'), {
	ssr: false,
})

export default function Home() {
	const [filters, setFilters] = useState({
		category: '',
		search: '',
		price: '',
		sort: '',
	})

	const handleFilter = (key: string, value: string) => {
		setFilters(prev => ({ ...prev, [key]: value }))
	}

	return (
		<div className='container mx-auto p-4'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<div className='md:col-span-2'>
					<Filters onFilter={handleFilter} />
				</div>
				<div className='md:col-span-1'>
					<SearchBar onSearch={value => handleFilter('search', value)} />
				</div>
			</div>
			<ProductList filters={filters} />
		</div>
	)
}
