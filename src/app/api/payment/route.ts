import { CartItem } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
	try {
		// Инициализация Stripe внутри функции
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
			apiVersion: '2025-01-27.acacia',
		})

		const { items, paymentMethod } = await req.json()

		const lineItems = items.map((item: CartItem) => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: item.title,
					description: item.description || '',
					images: item.image ? [item.image] : [],
				},
				unit_amount: Math.round(item.price * 100),
			},
			quantity: item.quantity || 1,
		}))

		const session = await stripe.checkout.sessions.create({
			payment_method_types: [paymentMethod],
			line_items: lineItems,
			mode: 'payment',
			success_url: `http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://localhost:3000/checkout/cancel`,
		})

		return NextResponse.json({ sessionId: session.id })
	} catch (error) {
		console.error(error)
		return new NextResponse('Ошибка при создании сессии оплаты', {
			status: 500,
		})
	}
}
