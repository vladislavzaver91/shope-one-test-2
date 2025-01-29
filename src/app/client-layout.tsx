'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const hideHi = pathname === '/'
	const hideHeader =
		pathname === '/login' || pathname === '/register' || pathname === '/admin'

	return !hideHeader ? (
		<>
			<Header />

			{hideHi && (
				<div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8'>
					<div className='container mx-auto px-4 py-16'>
						<div className='max-w-2xl'>
							<h1 className='text-4xl font-bold mb-4'>Welcome to Our Store</h1>
							<p className='text-lg mb-8'>
								Discover amazing products at great prices
							</p>
							<div className='flex gap-4'>
								<button className='bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors'>
									Shop Now
								</button>
								<button className='bg-transparent border-2 border-white px-6 py-2 rounded-full font-medium hover:bg-white/10 transition-colors'>
									Learn More
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			<main>{children}</main>
			<Footer />
		</>
	) : (
		<main>{children}</main>
	)
}
