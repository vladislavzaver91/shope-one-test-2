import Image from 'next/image'
import Link from 'next/link'
import { TbExternalLink } from 'react-icons/tb'
import { Product } from '../utils/mockData'

interface ProductCardProps {
	product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<div className='p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow'>
			<div className='relative w-full h-40 aspect-square'>
				<Image
					src={product.image}
					alt={product.name}
					fill
					className='w-full object-cover object-center rounded-t-lg'
				/>
			</div>
			<div className='p-2'>
				<h2 className='text-lg font-semibold'>{product.name}</h2>
				<p className='text-gray-500 text-sm mb-2'>{product.description}</p>
				<p className='text-gray-700 font-bold'>Price: ${product.price}</p>
				<p className='text-gray-500 text-sm'>Category: {product.category}</p>
				<p className='text-gray-500 text-sm'>Type: {product.type}</p>
				<div className='mt-4'>
					<Link href={`/product/${product.id}`}>
						<button className='px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2'>
							<span>Details</span>
							<TbExternalLink />
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
