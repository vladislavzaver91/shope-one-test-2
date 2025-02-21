/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductList = dynamic(() => import('@/components/home/ProductList'), {
	ssr: false,
})
const Filters = dynamic(() => import('@/components/home/Filters'), {
	ssr: false,
})

export default function Products() {
	const searchParams = useSearchParams()
	const categoryFromUrl = searchParams.get('category') || ''

	const [filters, setFilters] = useState({
		category: categoryFromUrl,
		attributes: [],
		type: [] as ('Digital' | 'Physical')[], // Типы теперь массив
		search: '',
		minPrice: '',
		maxPrice: '',
		sort: '',
	})

	useEffect(() => {
		setFilters(prev => ({ ...prev, category: categoryFromUrl }))
	}, [categoryFromUrl])

	// Обновление фильтров
	const handleFilter = (key: string, value: any) => {
		setFilters(prev => {
			if (key === 'type') {
				// Обновляем массив типов
				const newType = prev.type.includes(value)
					? prev.type.filter(t => t !== value) // Убираем, если уже выбран
					: [...prev.type, value] // Добавляем, если не выбран
				return { ...prev, type: newType }
			}
			return { ...prev, [key]: value } // Для остальных фильтров
		})
	}

	return (
		<main className='heading-section min-h-screen bg-gray-50'>
			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					<div className='lg:col-span-1'>
						<Filters onFilter={handleFilter} filters={filters} />
					</div>
					<div className='lg:col-span-3'>
						<ProductList filters={filters} />
					</div>
				</div>
			</div>
		</main>
	)
}
