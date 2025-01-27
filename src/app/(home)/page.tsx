'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const ProductList = dynamic(() => import('../../components/home/ProductList'), {
	ssr: false,
})
const Filters = dynamic(() => import('../../components/home/Filters'), {
	ssr: false,
})

export default function Home() {
	const [filters, setFilters] = useState({
		category: '',
		search: '',
		minPrice: '',
		maxPrice: '',
		sort: '',
	})

	const handleFilter = (key: string, value: string) => {
		setFilters(prev => ({ ...prev, [key]: value }))
	}

	return (
		<div className='container mx-auto p-4'>
			<div>
				<div>
					<Filters onFilter={handleFilter} />
				</div>
			</div>
			<ProductList filters={filters} />
		</div>
	)
}
