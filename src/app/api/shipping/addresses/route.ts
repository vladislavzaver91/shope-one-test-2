import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
	try {
		const userId = request.headers.get('user-id') // Получаем userId из заголовков
		if (!userId) {
			return NextResponse.json(
				{ error: 'User ID is required' },
				{ status: 400 }
			)
		}

		console.log('Fetching addresses for user ID:', userId)

		const addresses = await prisma.address.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		})

		if (!addresses || addresses.length === 0) {
			return NextResponse.json(
				{ message: 'No addresses found for this user.' },
				{ status: 404 }
			)
		}

		return NextResponse.json(addresses, { status: 200 })
	} catch (error) {
		console.error('Error fetching addresses:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch addresses' },
			{ status: 500 }
		)
	}
}
