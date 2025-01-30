'use client'

import { motion } from 'framer-motion'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormInputs {
	email: string
	password: string
}

interface DecodedToken {
	userId: string
}

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>()
	const [serverError, setServerError] = useState<string | null>(null)
	const router = useRouter()

	const onSubmit = async (data: LoginFormInputs) => {
		setServerError(null)

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				const errorData = await response.json()
				setServerError(errorData.error || 'Failed to log in.')
				return
			}

			const responseData = await response.json()
			const decodedToken = jwtDecode<DecodedToken>(responseData.accessToken)
			const userId = decodedToken.userId

			localStorage.setItem('accessToken', responseData.accessToken)
			localStorage.setItem('refreshToken', responseData.refreshToken)
			localStorage.setItem('userName', responseData.user.name || '')
			localStorage.setItem('userId', userId)
			console.log(responseData)

			router.push('/')
		} catch (error) {
			console.error('Login error:', error)
			setServerError('An unexpected error occurred. Please try again later.')
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0'>
			<motion.div
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className='bg-white w-full max-w-md rounded-lg shadow-lg p-8'
			>
				<h2 className='text-2xl font-bold text-center text-[#1a237e] mb-6'>
					Log In
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
							placeholder='Enter your password'
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
					{serverError && (
						<p className='text-sm text-red-500 mt-2'>{serverError}</p>
					)}
					<button
						type='submit'
						className='w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition'
					>
						Log In
					</button>
				</form>
				<p className='text-sm text-center text-gray-600 mt-6'>
					Don’t have an account?{' '}
					<a href='/register' className='text-blue-500 hover:underline'>
						Sign Up
					</a>
				</p>
			</motion.div>
		</div>
	)
}
