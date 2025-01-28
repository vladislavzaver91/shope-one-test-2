import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
	try {
		const { filters, page, limit } = await request.json()
		const { category, type, minPrice, maxPrice, sort } = filters

		const skip = (page - 1) * limit

		const where = {
			AND: [
				category ? { category: { equals: category } } : {},
				type.length > 0 ? { type: { in: type } } : {},
				minPrice || maxPrice ? { price: { gte: minPrice, lte: maxPrice } } : {},
			],
		}

		const orderBy =
			sort === 'price'
				? { price: 'asc' }
				: sort === 'price-desc'
				? { price: 'desc' }
				: { createdAt: 'desc' }

		const [products, totalCount] = await Promise.all([
			prisma.product.findMany({
				where,
				skip,
				take: limit,
				orderBy,
			}),
			prisma.product.count({ where }),
		])

		const totalPages = Math.ceil(totalCount / limit)

		return NextResponse.json({
			products,
			meta: { currentPage: page, totalPages, totalCount, limit },
		})
	} catch (error) {
		console.error('Error filtering products:', error)
		return NextResponse.json(
			{ error: 'Failed to filter products' },
			{ status: 500 }
		)
	} finally {
		await prisma.$disconnect()
	}
}
