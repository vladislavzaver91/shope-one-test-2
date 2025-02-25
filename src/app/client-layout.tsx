'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { applyUserSettings } from '@/helpers/functions/applyUserSettings'
import { CMSSettings } from '@/types'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const hideHi = pathname === '/'
	const hideHeader =
		pathname === '/login' || pathname === '/register' || pathname === '/admin'

	const [settings, setSettings] = useState<CMSSettings | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchSettings = async () => {
			const settingsId = localStorage.getItem('setting-id')
			try {
				const response = await fetch(`/api/site-settings?id=${settingsId}`)
				const data = await response.json()
				setSettings(data)
				if (data) {
					applyUserSettings(data)
				}
			} catch (error) {
				console.error('Failed to load site settings:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchSettings()
	}, [])

	useEffect(() => {
		if (settings) applyUserSettings(settings)
	}, [settings])

	if (loading) {
		return <p className='text-center mt-10 text-gray-600'>Loading...</p>
	}

	return !hideHeader ? (
		<>
			<Header />
			{hideHi && (
				<div
					className='bg-gradient-to-r text-white py-8'
					style={{ background: 'var(--accent-gradient)' }}
				>
					<div className='container mx-auto px-4 py-16'>
						<div className='max-w-2xl'>
							<h1 className='text-4xl font-bold mb-4'>Welcome to Our Store</h1>
							<p className='text-lg mb-8'>
								Discover amazing products at great prices
							</p>
							<div className='flex gap-4'>
								<button
									className='bg-white px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors'
									style={{
										color: 'var(--accent-color)',
									}}
								>
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

// 'use client'

// import Footer from '@/components/Footer'
// import Header from '@/components/Header'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// const applyUserSettings = () => {
// 	const storedAccentColor = localStorage.getItem('accentColor')
// 	const storedAccentColorDark = localStorage.getItem('accentColorDark')
// 	const storedFont = localStorage.getItem('font')
// 	const storedFontColor = localStorage.getItem('fontColor')
// 	const storedBorderProductCard = localStorage.getItem('borderProductCard')
// 	const storedBorderInfoCard = localStorage.getItem('borderInfoCard')
// 	const storedBorderBtn = localStorage.getItem('borderBtn')
// 	const storedBorderHeroBtn = localStorage.getItem('borderHeroBtn')
// 	const storedBorderHeaderInput = localStorage.getItem('borderHeaderInput')
// 	const storedBorderInput = localStorage.getItem('borderInput')

// 	if (storedAccentColor) {
// 		document.documentElement.style.setProperty(
// 			'--accent-color',
// 			storedAccentColor
// 		)
// 	}
// 	if (storedAccentColorDark) {
// 		document.documentElement.style.setProperty(
// 			'--accent-color-dark',
// 			storedAccentColorDark
// 		)
// 	}
// 	if (storedAccentColor && storedAccentColorDark) {
// 		document.documentElement.style.setProperty(
// 			'--accent-gradient',
// 			`linear-gradient(to right, ${storedAccentColor}, ${storedAccentColorDark})`
// 		)
// 	}
// 	if (storedFont) {
// 		document.documentElement.style.setProperty('--font-family', storedFont)
// 	}
// 	if (storedFontColor) {
// 		document.documentElement.style.setProperty('--font-color', storedFontColor)
// 	}
// 	if (storedBorderProductCard) {
// 		document.documentElement.style.setProperty(
// 			'--border-product-card',
// 			storedBorderProductCard
// 		)
// 	}
// 	if (storedBorderInfoCard) {
// 		document.documentElement.style.setProperty(
// 			'--border-info-card',
// 			storedBorderInfoCard
// 		)
// 	}
// 	if (storedBorderBtn) {
// 		document.documentElement.style.setProperty('--border-btn', storedBorderBtn)
// 	}
// 	if (storedBorderHeroBtn) {
// 		document.documentElement.style.setProperty(
// 			'--border-hero-btn',
// 			storedBorderHeroBtn
// 		)
// 	}
// 	if (storedBorderHeaderInput) {
// 		document.documentElement.style.setProperty(
// 			'--border-header-input-btn',
// 			storedBorderHeaderInput
// 		)
// 	}
// 	if (storedBorderInput) {
// 		document.documentElement.style.setProperty(
// 			'--border-input-btn',
// 			storedBorderInput
// 		)
// 	}
// }

// export default function ClientLayout({
// 	children,
// }: {
// 	children: React.ReactNode
// }) {
// 	const pathname = usePathname()
// 	const hideHi = pathname === '/'
// 	const hideHeader =
// 		pathname === '/login' || pathname === '/register' || pathname === '/admin'

// 	useEffect(() => {
// 		applyUserSettings()
// 	}, [])

// 	return !hideHeader ? (
// 		<>
// 			<Header />

// 			{hideHi && (
// 				<div
// 					className='bg-gradient-to-r text-white py-8'
// 					style={{ background: 'var(--accent-gradient)' }}
// 				>
// 					<div className='container mx-auto px-4 py-16'>
// 						<div className='max-w-2xl'>
// 							<h1 className='text-4xl font-bold mb-4'>Welcome to Our Store</h1>
// 							<p className='text-lg mb-8'>
// 								Discover amazing products at great prices
// 							</p>
// 							<div className='flex gap-4'>
// 								<button
// 									className='bg-white px-6 py-2 rounded-[var(--border-hero-btn)] font-medium hover:bg-blue-50 transition-colors'
// 									style={{
// 										color: 'var(--accent-color)',
// 									}}
// 								>
// 									Shop Now
// 								</button>
// 								<button className='bg-transparent border-2 border-white px-6 py-2 rounded-[var(--border-hero-btn)] font-medium hover:bg-white/10 transition-colors'>
// 									Learn More
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 			<main>{children}</main>
// 			<Footer />
// 		</>
// 	) : (
// 		<main>{children}</main>
// 	)
// }
