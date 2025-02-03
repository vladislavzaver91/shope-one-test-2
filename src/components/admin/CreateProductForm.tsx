'use client'

import { useState } from 'react'

interface CreateProductFormProps {
	onCreate: (newProduct: { name: string; id: string; type: string }) => void
	onCancel: () => void
}

const CreateProductForm = ({ onCreate, onCancel }: CreateProductFormProps) => {
	const [newProduct, setNewProduct] = useState({
		name: '',
		id: '',
		type: '',
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewProduct({
			...newProduct,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = () => {
		onCreate(newProduct)
		setNewProduct({ name: '', id: '', type: '' }) // Очистить форму после создания
	}

	return (
		<div className='bg-white shadow-md p-6 rounded-lg'>
			<h2 className='text-2xl mb-4'>Create New Product</h2>
			<input
				type='text'
				name='name'
				value={newProduct.name}
				onChange={handleInputChange}
				placeholder='Product Name'
				className='block w-full p-2 mb-4 border border-gray-300 rounded-lg'
			/>
			<input
				type='text'
				name='id'
				value={newProduct.id}
				onChange={handleInputChange}
				placeholder='Product ID'
				className='block w-full p-2 mb-4 border border-gray-300 rounded-lg'
			/>
			<input
				type='text'
				name='type'
				value={newProduct.type}
				onChange={handleInputChange}
				placeholder='Product Type'
				className='block w-full p-2 mb-4 border border-gray-300 rounded-lg'
			/>
			<button
				onClick={handleSubmit}
				className='bg-green-500 text-white p-2 rounded-lg'
			>
				Save Product
			</button>
			<button
				onClick={onCancel}
				className='ml-4 bg-gray-500 text-white p-2 rounded-lg'
			>
				Cancel
			</button>
		</div>
	)
}

export default CreateProductForm
