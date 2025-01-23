'use client'

import { useForm } from 'react-hook-form'
import { HiOutlineUser } from 'react-icons/hi'

interface SignupFormInputs {
	name: string
	email: string
	password: string
}

export default function SignupPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormInputs>()

	const onSubmit = (data: SignupFormInputs) => {
		console.log('Signup Data:', data)
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0'>
			<div className='bg-white w-full max-w-md rounded-lg shadow-lg p-8'>
				<div className='flex flex-col items-center mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>Sign Up</h2>
					<div className='flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full text-center'>
						<HiOutlineUser className='w-20 h-20 text-gray-400' />
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-700'
						>
							Name
						</label>
						<input
							id='name'
							type='text'
							className='w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none'
							placeholder='Enter your name'
							{...register('name', { required: 'Name is required' })}
						/>
						{errors.name && (
							<p className='text-sm text-red-500 mt-1'>{errors.name.message}</p>
						)}
					</div>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700'
						>
							Email
						</label>
						<input
							id='email'
							type='email'
							className='w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none'
							placeholder='Enter your email'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Invalid email address',
								},
							})}
						/>
						{errors.email && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.email.message}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-700'
						>
							Password
						</label>
						<input
							id='password'
							type='password'
							className='w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none'
							placeholder='Create a password'
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Password must be at least 6 characters',
								},
							})}
						/>
						{errors.password && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						type='submit'
						className='w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition'
					>
						Sign Up
					</button>
				</form>
				<p className='text-sm text-center text-gray-600 mt-6'>
					Already have an account?{' '}
					<a href='/login' className='text-blue-500 hover:underline'>
						Log In
					</a>
				</p>
			</div>
		</div>
	)
}
