'use client'

import Catalog from '@/components/home/Catalog'
import Hero from '@/components/home/Hero'
import NewItems from '@/components/home/NewItems'
import SpecialOffers from '@/components/home/SpecialOffers'
import Stock from '@/components/home/Stock'
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
			<div className='section'>
				<Hero />
			</div>
			<div className='section'>
				<Catalog />
			</div>
			<div className='section'>
				<Stock />
			</div>
			<div className='section'>
				<NewItems />
			</div>
			<div className='section'>
				<SpecialOffers />
			</div>

			<div>
				<div>
					<Filters onFilter={handleFilter} />
				</div>
			</div>
			<ProductList filters={filters} />
		</div>
	)
}
