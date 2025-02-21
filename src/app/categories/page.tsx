'use client'

import CategoriesList from '@/components/categories/CategoriesList'
import { CATEGORY_ITEMS } from '@/helpers/variables/categories'
import { useRouter } from 'next/navigation'

export default function Categories() {
	const router = useRouter()

	const handleCategoryClick = (category: string) => {
		router.push(`/products?category=${encodeURIComponent(category)}`)
	}

	return (
		<main className='min-h-screen bg-gray-50'>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-2xl font-bold text-center mb-6'>Categories</h1>
				<CategoriesList
					categories={CATEGORY_ITEMS}
					onClick={handleCategoryClick}
				/>
			</div>
		</main>
	)
}
