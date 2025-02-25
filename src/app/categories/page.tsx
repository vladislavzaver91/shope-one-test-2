'use client'

import { CATEGORY_ITEMS } from '@/helpers/variables/categories'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const CategoriesList = dynamic(
	() => import('@/components/categories/CategoriesList'),
	{ ssr: false }
)

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
