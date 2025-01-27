'use client'

import { useCart } from '@/helpers/context/CartContext'
import { Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import UserMenu from './ui/UserMenu'

const Header = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false)
	const [userName, setUserName] = useState<string | null>(null)
	const { cart } = useCart()

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		const userName = localStorage.getItem('userName')

		if (accessToken) {
			setIsAuth(true)
			setUserName(userName)
		}
	}, [])

	const handleLogout = () => {
		setIsAuth(false)
		setUserName(null)
	}

	return (
		<header className='bg-white shadow-md fixed w-full z-10'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16'>
				<Link
					href='/'
					className='text-2xl font-bold uppercase tracking-widest text-gray-800 font-[family-name:var(--font-quicksand-sans)]'
				>
					shop
				</Link>

				<nav className='flex items-center space-x-4'>
					<Link href='/products' className='text-gray-800 hover:text-blue-500'>
						Products
					</Link>
					<Link href='/about' className='text-gray-800 hover:text-blue-500'>
						About Us
					</Link>
					<Link href='/contact' className='text-gray-800 hover:text-blue-500'>
						Contact
					</Link>
				</nav>

				{isAuth ? (
					<div className='flex items-center space-x-4'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search products...'
								className='max-w-48 pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
								// onChange={(e) => onSearch(e.target.value)}
							/>
							<Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
						</div>
						<Link href='/cart'>
							<button className='p-2 hover:bg-gray-100 rounded-full relative'>
								<ShoppingCart className='w-6 h-6' />
								{cart.length > 0 && (
									<span className='w-5 h-5 text-center -right-2 top-0 rounded-full absolute bg-blue-600 text-sm font-medium text-white'>
										{cart.length}
									</span>
								)}
							</button>
						</Link>

						<UserMenu userName={userName} onLogout={handleLogout} />
					</div>
				) : (
					<div className='flex items-center space-x-4'>
						<Link
							href='/login'
							className='px-4 py-2 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition'
						>
							Log In
						</Link>
						<Link
							href='/register'
							className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
						>
							Sign Up
						</Link>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
