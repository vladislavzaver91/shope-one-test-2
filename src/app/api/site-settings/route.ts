import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const id = searchParams.get('id')

	if (id) {
		try {
			const settings = await prisma.siteSettings.findUnique({
				where: { id },
			})
			return NextResponse.json(settings || {})
		} catch (error) {
			console.error('GET /settings error:', error)
			return NextResponse.json(
				{ error: 'Failed to fetch settings' },
				{ status: 500 }
			)
		}
	}
}

export async function POST(req: NextRequest) {
	try {
		const data = await req.json()
		const settingsId = data.id

		let settings
		if (settingsId) {
			settings = await prisma.siteSettings.update({
				where: { id: settingsId },
				data,
			})
		} else {
			settings = await prisma.siteSettings.create({ data })
		}

		return NextResponse.json(settings)
	} catch (error) {
		console.error('POST /settings error:', error)
		return NextResponse.json(
			{ error: 'Failed to update settings' },
			{ status: 500 }
		)
	}
}
