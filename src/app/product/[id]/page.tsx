import ProductItem from '@/components/ProductItem'
import { mockProducts } from '@/utils/mockData'

export default async function ProductPage({
	params,
}: {
	params: { id: string }
}) {
	const { id } = await params
	const decodedId = decodeURIComponent(id)
	const product = mockProducts.find(p => p.id === decodedId)

	if (!product) {
		return <p>Product not found</p>
	}

	return (
		<div className='container'>
			<ProductItem product={product} />
		</div>
	)
}
