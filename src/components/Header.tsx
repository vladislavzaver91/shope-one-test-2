'use client'

import { useCart } from '@/helpers/context/CartContext'
import useModal from '@/helpers/hooks/useModal'
import { Product } from '@/types'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SearchBar from './ui/SearchBar'
import UserMenu from './ui/UserMenu'

const Header = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false)
	const [userName, setUserName] = useState<string | null>(null)
	const [products, setProducts] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const { isOpen, toggleMenu } = useModal()
	const { cart } = useCart()

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true)
			try {
				const response = await fetch('/api/products/search', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ searchQuery }),
				})

				const data = await response.json()

				if (!response.ok) {
					throw new Error(data.message || 'Failed to fetch products')
				}

				setProducts(data.products || [])
			} catch (error) {
				console.log('Error:', error)
				setProducts([])
			} finally {
				setIsLoading(false)
			}
		}

		if (searchQuery) {
			fetchProducts()
		}
	}, [searchQuery])

	console.log(products)

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
		<header className='bg-white shadow-md fixed w-full z-20'>
			<div className='container w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16'>
				<Link
					href='/'
					className='text-2xl font-bold uppercase tracking-widest text-gray-800 font-[family-name:var(--font-quicksand-sans)]'
				>
					shop
				</Link>

				<nav className='hidden md:flex items-center space-x-4'>
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
					<div className='flex items-center gap-2'>
						<SearchBar
							onSearch={value => setSearchQuery(value)}
							products={products}
							isLoading={isLoading}
						/>
						<div className='flex gap-2'>
							<Link href='/cart' className='hidden md:block'>
								<button className='p-2 hover:bg-gray-100 rounded-full relative'>
									<ShoppingCart className='w-6 h-6' />
									{cart.length > 0 && (
										<span className='w-5 h-5 text-center -right-2 top-0 rounded-full absolute bg-blue-600 text-sm font-medium text-white'>
											{cart.length}
										</span>
									)}
								</button>
							</Link>
							<button onClick={toggleMenu} className='block md:hidden'>
								{isOpen ? (
									<button className='flex items-center justify-center w-8 h-8 border border-[#0c0c0c] rounded-full'>
										<ChevronUp size={24} />
									</button>
								) : (
									<button className='flex items-center justify-center w-8 h-8 border border-[#0c0c0c] rounded-full'>
										<ChevronDown size={24} />
									</button>
								)}
							</button>

							<UserMenu userName={userName} onLogout={handleLogout} />
						</div>
					</div>
				) : (
					<div className='hidden md:flex items-center space-x-4'>
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

			{/* mobile nav */}
			{isOpen && (
				<motion.div
					initial={{ y: '-100%', opacity: 0 }}
					animate={{ y: isOpen ? '0%' : '-100%', opacity: isOpen ? 1 : 0 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className='fixed top-16 left-0 w-full h-screen bg-white shadow-lg md:hidden'
				>
					<div className='overflow-y-auto h-screen flex flex-col items-center py-6 space-y-6'>
						<Link
							href='/products'
							onClick={toggleMenu}
							className='text-xl text-gray-800 hover:text-blue-500'
						>
							Products
						</Link>
						<Link
							href='/about'
							onClick={toggleMenu}
							className='text-xl text-gray-800 hover:text-blue-500'
						>
							About Us
						</Link>
						<Link
							href='/contact'
							onClick={toggleMenu}
							className='text-xl text-gray-800 hover:text-blue-500'
						>
							Contact
						</Link>

						<Link
							href='/cart'
							onClick={toggleMenu}
							className='relative flex items-center space-x-2 text-gray-800 hover:text-blue-500'
						>
							<ShoppingCart className='w-6 h-6' />
						</Link>
						{!isAuth && (
							<div className='flex items-center space-x-2'>
								<Link
									href='/login'
									onClick={toggleMenu}
									className='px-4 py-2 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition'
								>
									Log In
								</Link>
								<Link
									href='/register'
									onClick={toggleMenu}
									className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
								>
									Sign Up
								</Link>
							</div>
						)}
					</div>
				</motion.div>
			)}
		</header>
	)
}

export default Header
