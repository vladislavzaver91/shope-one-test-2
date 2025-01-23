'use client'

import Header from '@/components/Header'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const hideHeader = pathname === '/login' || pathname === '/signup'

	return !hideHeader ? (
		<>
			<Header />
			<main className='heading-section'>{children}</main>
		</>
	) : (
		<main>{children}</main>
	)
}
