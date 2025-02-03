import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.json();
//     const order = await prisma.order.create({ data });
//     console.log("order created:", order);
//     return NextResponse.json(order, { status: 201 });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json(
//       { error: "Failed to create order" },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

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
		const { productIds, deliveryAddressId } = body

		if (!productIds || productIds.length === 0 || !deliveryAddressId) {
			return NextResponse.json(
				{ error: 'Product IDs and delivery address are required' },
				{ status: 400 }
			)
		}

		// Checking if an address with the same ID exists
		const existingAddress = await prisma.address.findUnique({
			where: { id: deliveryAddressId },
		})

		if (!existingAddress) {
			return NextResponse.json({ error: 'Address not found' }, { status: 404 })
		}

		const newOrder = await prisma.order.create({
			data: {
				userId,
				productIds,
				deliveryAddressId, // Referring to an address by ID
				status: 'Pending',
			},
			include: {
				deliveryAddress: true, // Include the address in the response
			},
		})

		return NextResponse.json(newOrder, { status: 201 })
	} catch (error) {
		console.error('Error creating order:', error)
		return NextResponse.json(
			{ error: 'Failed to create order' },
			{ status: 500 }
		)
	}
}

// export async function GET() {
// 	try {
// 		const orders = await prisma.order.findMany()
// 		if (orders.length === 0) {
// 			return NextResponse.json({ message: 'No orders found' }, { status: 404 })
// 		}
// 		return NextResponse.json({ orders })
// 	} catch (error) {
// 		console.error('Error fetching orders:', error)
// 		return NextResponse.json(
// 			{ error: 'Failed to fetch orders' },
// 			{ status: 500 }
// 		)
// 	} finally {
// 		await prisma.$disconnect()
// 	}
// }

export async function GET() {
	try {
		// Получение всех заказов с деталями о товарах и адресах
		const orders = await prisma.order.findMany({
			include: {
				products: true, // Включаем информацию о продуктах
				deliveryAddress: true, // Включаем информацию о доставке
			},
		})

		if (orders.length === 0) {
			return NextResponse.json({ message: 'No orders found' }, { status: 404 })
		}

		return NextResponse.json({ orders })
	} catch (error) {
		console.error('Error fetching orders:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch orders' },
			{ status: 500 }
		)
	} finally {
		await prisma.$disconnect() // Отключаемся от базы данных после выполнения запроса
	}
}
