import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
	try {
		const userId = request.headers.get('user-id')
		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 }
			)
		}

		const addresses = await prisma.address.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		})

		return NextResponse.json(addresses, { status: 200 })
	} catch (error) {
		console.error('Error fetching addresses:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch addresses' },
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	try {
		const userId = request.headers.get('user-id')
		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 }
			)
		}

		const body = await request.json()
		const { name, address, city, postalCode, country, isDefault } = body

		if (
			!name ||
			!address ||
			!city ||
			!postalCode ||
			!country ||
			isDefault === undefined
		) {
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 }
			)
		}

		const newAddress = await prisma.address.create({
			data: {
				userId,
				name,
				address,
				city,
				postalCode,
				country,
				isDefault,
			},
		})

		return NextResponse.json(newAddress, { status: 201 })
	} catch (error) {
		console.error('Error saving address:', error)
		return NextResponse.json(
			{ error: 'Failed to save address' },
			{ status: 500 }
		)
	}
}
