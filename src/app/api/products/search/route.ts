import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
	try {
		const { searchQuery } = await request.json()
		const products = await prisma.product.findMany({
			where: {
				OR: [
					{ title: { contains: searchQuery, mode: 'insensitive' } },
					{ description: { contains: searchQuery, mode: 'insensitive' } },
				],
			},
		})

		return NextResponse.json({ products }, { status: 200 })
	} catch (error) {
		console.error('Error searching products:', error)
		return NextResponse.json(
			{ error: 'Failed to search products' },
			{ status: 500 }
		)
	} finally {
		await prisma.$disconnect()
	}
}
