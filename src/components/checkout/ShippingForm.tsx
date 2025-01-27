'use client'

import { Address } from '@/types'
import { useForm } from 'react-hook-form'

interface ShippingFormProps {
	onSubmit: (data: Address) => void
}

const ShippingForm = ({ onSubmit }: ShippingFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Address>()

	const saveAddressToLocalStorage = (data: Address) => {
		const existingAddresses = JSON.parse(
			localStorage.getItem('addresses') || '[]'
		) as Address[]

		const isDuplicate = existingAddresses.some(
			address =>
				address.address === data.address &&
				address.city === data.city &&
				address.zipCode === data.zipCode &&
				address.country === data.country
		)

		if (isDuplicate) {
			console.log('Duplicate address detected. Not saving.')
			return
		}

		const updatedAddresses = [...existingAddresses, data]
		localStorage.setItem('addresses', JSON.stringify(updatedAddresses))
	}

	const handleFormSubmit = (data: Address) => {
		saveAddressToLocalStorage(data)
		onSubmit(data)
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
			<div>
				<label htmlFor='address' className='block text-gray-700 font-medium'>
					Address
				</label>
				<input
					type='text'
					id='address'
					className='w-full border rounded-lg px-4 py-2 mt-1'
					placeholder='Enter your address'
					{...register('address', { required: 'Address is required' })}
				/>
				{errors.address && (
					<p className='text-red-500 text-sm mt-1'>{errors.address.message}</p>
				)}
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label htmlFor='city' className='block text-gray-700 font-medium'>
						City
					</label>
					<input
						type='text'
						id='city'
						className='w-full border rounded-lg px-4 py-2 mt-1'
						placeholder='City'
						{...register('city', { required: 'City is required' })}
					/>
					{errors.city && (
						<p className='text-red-500 text-sm mt-1'>{errors.city.message}</p>
					)}
				</div>
				<div>
					<label htmlFor='zipCode' className='block text-gray-700 font-medium'>
						ZIP Code
					</label>
					<input
						type='text'
						id='zipCode'
						className='w-full border rounded-lg px-4 py-2 mt-1'
						placeholder='ZIP Code'
						{...register('zipCode', { required: 'ZIP Code is required' })}
					/>
					{errors.zipCode && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.zipCode.message}
						</p>
					)}
				</div>
			</div>
			<div>
				<label htmlFor='country' className='block text-gray-700 font-medium'>
					Country
				</label>
				<select
					id='country'
					className='w-full border rounded-lg px-4 py-2 mt-1'
					{...register('country', { required: 'Country is required' })}
				>
					<option value=''>Select country</option>
					<option value='US'>United States</option>
					<option value='CA'>Canada</option>
				</select>
				{errors.country && (
					<p className='text-red-500 text-sm mt-1'>{errors.country.message}</p>
				)}
			</div>
			<button
				type='submit'
				className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
			>
				Continue to Payment
			</button>
		</form>
	)
}

export default ShippingForm
