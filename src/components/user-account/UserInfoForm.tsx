import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const UserInfoForm = () => {
	const [userEmail, setUserEmail] = useState<string | ''>('')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: localStorage.getItem('userName') || '',
			email: userEmail,
			phone: '+199999999',
		},
	})

	useEffect(() => {
		// Получение email по токену
		const fetchUserEmail = async () => {
			try {
				const response = await fetch('/api/users/me', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				})
				if (response.ok) {
					const data = await response.json()
					setUserEmail(data.email)
				}
			} catch (error) {
				console.error('Error fetching user email:', error)
			}
		}
		fetchUserEmail()
	}, [])

	const onSubmit = (data: unknown) => {
		console.log('Updated User Info:', data)
		// sended data to server
	}

	return (
		<section>
			<h2 className='text-xl font-semibold text-gray-700 mb-4'>
				Personal information
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-white p-6 rounded-lg shadow-md space-y-4'
			>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Name
					</label>
					<input
						{...register('name', { required: 'Name required' })}
						className='mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
					/>
					{errors.name && (
						<p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Email
					</label>
					<input
						{...register('email', {
							required: 'Email required',
							pattern: {
								value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								message: 'Enter a correct email',
							},
						})}
						readOnly
						className='mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
					/>
					{errors.email && (
						<p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Phone
					</label>
					<input
						{...register('phone', {
							required: 'Phone required',
							pattern: {
								value: /^[0-9]{10,12}$/,
								message: 'Enter a correct phone number',
							},
						})}
						className='mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
					/>
					{errors.phone && (
						<p className='text-red-600 text-sm mt-1'>{errors.phone.message}</p>
					)}
				</div>

				<button
					type='submit'
					className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
				>
					Save changes
				</button>
			</form>
		</section>
	)
}

export default UserInfoForm
