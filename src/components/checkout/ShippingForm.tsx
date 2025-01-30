'use client'

import { Address } from '@/types'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
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

	const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
	const [selectedCountry, setSelectedCountry] = useState<string>('')
	const [addresses, setAddresses] = useState<Address[]>([])
	const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

	const countries = [
		{ value: 'US', label: 'United States' },
		{ value: 'CA', label: 'Canada' },
		{ value: 'GB', label: 'United Kingdom' },
	]

	useEffect(() => {
		const fetchAddresses = async () => {
			try {
				const userId = localStorage.getItem('userId')
				if (!userId) {
					console.log('User ID not found')
					return
				}

				const response = await fetch('/api/shipping/addresses', {
					method: 'GET',
					headers: {
						'user-id': userId,
					},
				})

				if (!response.ok) {
					throw new Error('Failed to fetch addresses')
				}

				const data = await response.json()
				console.log(data)
				setAddresses(data)
			} catch (error) {
				console.error('Error fetching addresses:', error)
			}
		}

		fetchAddresses()
	}, [])

	const handleFormSubmit = (data: Address) => {
		onSubmit(data)
	}

	return (
		<motion.form
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.2 }}
			onSubmit={handleSubmit(handleFormSubmit)}
			className='relative space-y-6 bg-white rounded-xl shadow-md p-6'
		>
			{/* Background elements */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 0.1, scale: 1 }}
				transition={{ duration: 1 }}
				className='absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-xl -z-10'
			/>
			<motion.div
				initial={{ x: -50, opacity: 0 }}
				animate={{ x: 0, opacity: 0.15 }}
				transition={{ duration: 1.2, delay: 0.3 }}
				className='absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full -z-10'
			/>
			<motion.div
				initial={{ x: 50, opacity: 0 }}
				animate={{ x: 0, opacity: 0.15 }}
				transition={{ duration: 1.2, delay: 0.5 }}
				className='absolute -bottom-10 -right-10 w-32 h-32 bg-blue-300 rounded-full -z-10'
			/>
			{/* Address */}
			<div>
				<label
					htmlFor='address'
					className='font-[family-name:var(--font-nunito-sans)] tracking-wider block text-sm font-medium text-gray-700'
				>
					Address
				</label>
				<input
					type='text'
					id='address'
					className='w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Enter your address'
					{...register('address', { required: 'Address is required' })}
				/>
				{errors.address && (
					<p className='text-red-500 text-sm mt-1'>{errors.address.message}</p>
				)}
			</div>

			{/* City and Postal Code */}
			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label
						htmlFor='city'
						className='font-[family-name:var(--font-nunito-sans)] tracking-wider block text-sm font-medium text-gray-700'
					>
						City
					</label>
					<input
						type='text'
						id='city'
						className='w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='City'
						{...register('city', { required: 'City is required' })}
					/>
					{errors.city && (
						<p className='text-red-500 text-sm mt-1'>{errors.city.message}</p>
					)}
				</div>
				<div>
					<label
						htmlFor='zipCode'
						className='font-[family-name:var(--font-nunito-sans)] tracking-wider block text-sm font-medium text-gray-700'
					>
						Postal Code
					</label>
					<input
						type='text'
						id='zipCode'
						className='w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='ZIP Code'
						{...register('postalCode', { required: 'Postal Code is required' })}
					/>
					{errors.postalCode && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.postalCode.message}
						</p>
					)}
				</div>
			</div>

			{/* Country */}
			<div className='relative'>
				<label
					htmlFor='country'
					className='font-[family-name:var(--font-nunito-sans)] tracking-wider block text-sm font-medium text-gray-700'
				>
					Country
				</label>
				<div
					className='w-full p-3 bg-gray-50 rounded-lg border flex justify-between items-center cursor-pointer'
					onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
				>
					<span className={selectedCountry ? '' : 'text-gray-400'}>
						{selectedCountry || 'Select country'}
					</span>
					{isCountryDropdownOpen ? (
						<ChevronUp className='w-5 h-5 text-gray-500' />
					) : (
						<ChevronDown className='w-5 h-5 text-gray-500' />
					)}
				</div>
				<motion.ul
					initial={{ opacity: 0, y: -10 }}
					animate={{
						opacity: isCountryDropdownOpen ? 1 : 0,
						y: isCountryDropdownOpen ? 0 : -10,
					}}
					className={`absolute top-14 left-0 right-0 bg-white border rounded-lg shadow-lg overflow-hidden ${
						isCountryDropdownOpen ? 'block' : 'hidden'
					}`}
				>
					{countries.map(country => (
						<li
							key={country.value}
							className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
							onClick={() => {
								setSelectedCountry(country.label)
								setIsCountryDropdownOpen(false)
							}}
						>
							{country.label}
						</li>
					))}
				</motion.ul>
				{errors.country && (
					<p className='text-red-500 text-sm mt-1'>{errors.country.message}</p>
				)}
			</div>

			{/* Submit Button */}
			<motion.button
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				type='submit'
				className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
			>
				Continue to Payment
			</motion.button>
		</motion.form>
	)
}

export default ShippingForm
