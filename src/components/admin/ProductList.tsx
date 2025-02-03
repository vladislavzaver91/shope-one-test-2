import { Product } from '@/types'

interface ProductListProps {
	products: Product[]
	onEdit: (productId: string) => void
	onDelete: (productId: string) => void
}

const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
	return (
		<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
			{products.map(product => (
				<div key={product.id} className='bg-white p-4 shadow-md rounded-lg'>
					<h3 className='text-lg font-semibold'>{product.title}</h3>
					<p className='text-gray-600'>ID: {product.id}</p>
					<p className='text-gray-600'>Type: {product.type}</p>

					<div className='mt-4 flex justify-between'>
						<button
							onClick={() => onEdit(product.id)}
							className='bg-yellow-500 text-white p-2 rounded-lg'
						>
							Edit
						</button>
						<button
							onClick={() => onDelete(product.id)}
							className='bg-red-500 text-white p-2 rounded-lg'
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProductList
