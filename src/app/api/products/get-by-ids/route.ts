import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
	try {
		const { productIds } = await request.json()

		if (!Array.isArray(productIds) || productIds.length === 0) {
			return NextResponse.json(
				{ error: 'productIds must be a non-empty array' },
				{ status: 400 }
			)
		}

		const products = await prisma.product.findMany({
			where: {
				id: { in: productIds },
			},
		})

		console.log('Fetched products:', products)

		return NextResponse.json({ products })
	} catch (error) {
		console.error('Error fetching products:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch products' },
			{ status: 500 }
		)
	} finally {
		await prisma.$disconnect()
	}
}
