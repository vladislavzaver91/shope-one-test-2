'use client'

import ProductItem from '@/components/product/ProductItem'
import { Product } from '@/types'
import { getProductsFromLocalStorage } from '@/utils/localStorageProducts'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const [product, setProduct] = useState<Product | null>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const fetchParams = async () => {
			const { id } = await params
			const decodedId = decodeURIComponent(id)
			const products = getProductsFromLocalStorage()

			const foundProduct = products.find((p: Product) => p.id === decodedId)
			if (foundProduct) {
				setProduct(foundProduct)
			} else {
				router.replace('/404')
			}
			setLoading(false)
		}

		fetchParams()
	}, [params, router])

	if (loading) {
		return <p>Loading product...</p>
	}

	if (!product) {
		return null
	}

	return (
		<div className='container'>
			<ProductItem product={product} />
		</div>
	)
}
