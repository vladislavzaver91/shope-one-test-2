import useModal from '@/helpers/hooks/useModal'
import { Address } from '@/types'
import { useForm } from 'react-hook-form'
import Modal from '../ui/Modal'

interface AddressManagerProps {
	addresses: Address[]
	onUpdate: (data: AddressFormData) => void
}

interface AddressFormData {
	address: string
	city: string
	zipCode: string
	country: string
}

const AddressManager = ({ addresses, onUpdate }: AddressManagerProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddressFormData>()
	const { isOpen, setIsOpen } = useModal()

	const handleFormSubmit = (data: AddressFormData) => {
		onUpdate(data)
		setIsOpen(false)
	}

	return (
		<section>
			<h2 className='text-xl font-semibold text-gray-700 mb-4'>
				Delivery addresses
			</h2>
			<ul className='space-y-2'>
				{addresses.map((address, index) => (
					<li
						key={index}
						className='bg-white p-4 rounded-lg shadow-md border border-gray-200'
					>
						<p>{address.address}</p>
						<p>{address.city}</p>
						<p>{address.country}</p>
						<p>{address?.fullName}</p>
						<p>{address.zipCode}</p>
					</li>
				))}
			</ul>
			<button
				onClick={() => setIsOpen(true)}
				className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
			>
				Add address
			</button>

			<Modal
				isOpen={isOpen}
				close={setIsOpen}
				title='Add Address'
				className='max-w-2xl '
				actions={
					<>
						<button
							type='button'
							className='px-2 sm:px-4 py-2 bg-gray-400 text-white max-[639px]:text-sm rounded-lg hover:bg-gray-500'
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</button>
						<button
							type='submit'
							form='addressForm'
							className='px-2 sm:px-4 py-2 bg-blue-600 text-white max-[639px]:text-sm rounded-lg hover:bg-blue-700'
						>
							Save Address
						</button>
					</>
				}
			>
				<form
					id='addressForm'
					onSubmit={handleSubmit(handleFormSubmit)}
					className='space-y-4'
				>
					<div>
						<label htmlFor='address' className='block text-gray-700'>
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
							<p className='text-red-500 text-sm mt-1'>
								{errors.address.message}
							</p>
						)}
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label htmlFor='city' className='block text-gray-700'>
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
								<p className='text-red-500 text-sm mt-1'>
									{errors.city.message}
								</p>
							)}
						</div>
						<div>
							<label htmlFor='zipCode' className='block text-gray-700'>
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
						<label htmlFor='country' className='block text-gray-700'>
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
							<p className='text-red-500 text-sm mt-1'>
								{errors.country.message}
							</p>
						)}
					</div>
				</form>
			</Modal>
		</section>
	)
}

export default AddressManager
