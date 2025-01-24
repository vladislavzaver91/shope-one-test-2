'use client'

import { Product } from '@/types'
import { useEffect, useState } from 'react'

interface ProductManagementProps {
	products: Product[]
	addProduct: (product: Product) => void
	editProduct: (updateProduct: Product) => void
	deleteProduct: (id: string) => void
	selectedProduct: Product | null
	setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>
	isEditing: boolean
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductManagement = ({
	products,
	addProduct,
	editProduct,
	deleteProduct,
	selectedProduct,
	setSelectedProduct,
	isEditing,
	setIsEditing,
}: ProductManagementProps) => {
	const [form, setForm] = useState<Product>({
		id: '',
		name: '',
		description: '',
		price: 0,
		popularity: 0,
		image: '',
		category: '',
		type: '',
	})

	useEffect(() => {
		if (selectedProduct) setForm(selectedProduct)
	}, [selectedProduct])

	const handleSubmit = () => {
		if (isEditing) {
			editProduct(form)
		} else {
			addProduct({ ...form, id: `Product ${Date.now()}` })
		}
		setForm({
			id: '',
			name: '',
			description: '',
			price: 0,
			popularity: 0,
			image: '',
			category: '',
			type: '',
		})
	}

	return (
		<div className='bg-white p-4 rounded-lg shadow-md'>
			<h2 className='text-xl font-semibold mb-4'>Manage Products</h2>

			<form className='space-y-4'>
				<input
					type='text'
					placeholder='Name'
					value={form.name}
					onChange={e => setForm({ ...form, name: e.target.value })}
					className='w-full p-2 border rounded-lg'
				/>
				<textarea
					placeholder='Description'
					value={form.description}
					onChange={e => setForm({ ...form, description: e.target.value })}
					className='w-full p-2 border rounded-lg'
				></textarea>
				<input
					type='number'
					placeholder='Price'
					value={form.price}
					onChange={e =>
						setForm({ ...form, price: parseFloat(e.target.value) })
					}
					className='w-full p-2 border rounded-lg'
				/>
				<input
					type='text'
					placeholder='Category'
					value={form.category}
					onChange={e => setForm({ ...form, category: e.target.value })}
					className='w-full p-2 border rounded-lg'
				/>
				<input
					type='text'
					placeholder='Type'
					value={form.type}
					onChange={e => setForm({ ...form, type: e.target.value })}
					className='w-full p-2 border rounded-lg'
				/>

				<button
					type='button'
					onClick={handleSubmit}
					className='w-full p-2 bg-blue-500 text-white rounded-lg'
				>
					{isEditing ? 'Update Product' : 'Add Product'}
				</button>
			</form>

			<ul className='mt-4 space-y-2'>
				{products.map((product: Product) => (
					<li key={product.id} className='flex justify-between items-center'>
						<span>{product.name}</span>
						<div>
							<button
								onClick={() => {
									setSelectedProduct(product)
									setIsEditing(true)
								}}
								className='text-blue-500'
							>
								Edit
							</button>
							<button
								onClick={() => deleteProduct(product.id)}
								className='text-red-500 ml-2'
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ProductManagement
