import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
	try {
		const authHeader = request.headers.get('Authorization')
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const token = authHeader.split(' ')[1]
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let decodedToken: any
		try {
			decodedToken = jwt.verify(token, process.env.JWT_SECRET!)
		} catch {
			return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
		}

		const user = await prisma.user.findUnique({
			where: { id: decodedToken.userId },
			select: { id: true, email: true, name: true, type: true },
		})

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		return NextResponse.json(user, { status: 200 })
	} catch (error) {
		console.error('Error fetching user:', error)
		return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}
