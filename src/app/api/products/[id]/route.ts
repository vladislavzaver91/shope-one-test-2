import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const body = await request.json()

		const updatedproduct = await prisma.product.update({
			where: { id: id },
			data: body,
		})

		return NextResponse.json(updatedproduct)
	} catch (error) {
		console.error('Error updating product:', error)
		return NextResponse.json(
			{ error: 'Failed to update product' },
			{ status: 500 }
		)
	}
}
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params // Используем await для получения параметров

		const product = await prisma.product.findUnique({
			where: { id },
		})

		if (!product) {
			return NextResponse.json(
				{ message: 'Product not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(product)
	} catch (error) {
		console.error('Error fetching product:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch product' },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params // Используем await для получения параметров
		const product = await prisma.product.delete({
			where: { id },
		})

		return NextResponse.json(product)
	} catch (error) {
		console.error('Error deleting product:', error)
		return NextResponse.json(
			{ error: 'Failed to delete product' },
			{ status: 500 }
		)
	}
}
