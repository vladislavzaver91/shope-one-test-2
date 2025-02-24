'use client'

import { Facebook, Instagram, Linkedin, Send, Twitter } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
	return (
		<footer
			className='shadow-md text-white w-full py-7 px-6 z-10'
			style={{ background: 'var(--accent-gradient)' }}
		>
			<div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10'>
				{/* left section */}
				<div>
					<Link
						href='/'
						className='text-2xl font-bold uppercase tracking-widest font-[family-name:var(--font-quicksand-sans)]'
					>
						Shop
					</Link>
					<p className='text-gray-400 mt-3'>
						The best store for your shopping. We offer a wide range of products,
						including both digital downloads and physical products at
						competitive prices.
					</p>
				</div>

				{/* middle секция */}
				<nav className='flex flex-col space-y-3 text-gray-300'>
					<h3 className='text-lg tracking-widest font-semibold text-white [family-name:var(--font-quicksand-sans)]'>
						Navigation
					</h3>
					<Link href='/products' className='hover:text-blue-400 transition'>
						Products
					</Link>
					<Link href='/about' className='hover:text-blue-400 transition'>
						About Us
					</Link>
					<Link href='/contact' className='hover:text-blue-400 transition'>
						Contact
					</Link>
				</nav>

				{/* right section */}
				<div>
					<h3 className='text-lg tracking-widest [family-name:var(--font-quicksand-sans)] font-semibold'>
						Subscribe to news
					</h3>
					<p className='text-gray-400'>
						Stay up to date with new arrivals and promotions
					</p>
					<div className='flex gap-3 mt-3'>
						<input
							type='email'
							placeholder='Your email'
							className='px-4 py-2 rounded-md bg-gray-700 focus:ring focus:ring-blue-400 outline-none w-full'
						/>
						<button className='flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-[var(--accent-color)] hover:bg-[var(--accent-color-dark)] transition-colors'>
							Send <Send size={16} />
						</button>
					</div>
				</div>
			</div>

			{/* social network */}
			<div className='mt-10 border-t border-gray-700 pt-5 flex flex-col md:flex-row justify-between items-center'>
				<p className='text-gray-400 text-sm'>
					© 2024 Shop. All rights reserved.
				</p>
				<div className='flex space-x-4 mt-3 md:mt-0'>
					<Link href='#' className='hover:text-blue-400 transition'>
						<Facebook className='w-5 h-5' />
					</Link>
					<Link href='#' className='hover:text-blue-400 transition'>
						<Twitter className='w-5 h-5' />
					</Link>
					<Link href='#' className='hover:text-blue-400 transition'>
						<Instagram className='w-5 h-5' />
					</Link>
					<Link href='#' className='hover:text-blue-400 transition'>
						<Linkedin className='w-5 h-5' />
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer
