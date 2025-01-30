import { mkdir, writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()
		const file = formData.get('file') as File

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
		}

		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)
		const uploadDir = path.join(process.cwd(), 'public/uploads')

		await mkdir(uploadDir, { recursive: true })

		const filename = `${Date.now()}-${file.name}`
		const filepath = path.join(uploadDir, filename)

		await writeFile(filepath, buffer)

		return NextResponse.json({ url: `/uploads/${filename}` })
	} catch (error) {
		console.error('Error uploading file:', error)
		return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
	}
}
