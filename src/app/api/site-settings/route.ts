import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
	try {
		const settings = await prisma.siteSettings.findFirst()
		console.log('Settings fetched from server:', settings)
		return NextResponse.json(settings || {})
	} catch (error) {
		console.error('GET /settings error:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch settings' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		const data = await req.json()
		console.log('Data received from client:', data)
		const settings = await prisma.siteSettings.upsert({
			where: { id: '1' },
			update: data,
			create: data,
		})
		return NextResponse.json(settings)
	} catch (error) {
		console.error('POST /settings error:', error)
		return NextResponse.json(
			{ error: 'Failed to update settings' },
			{ status: 500 }
		)
	}
}
