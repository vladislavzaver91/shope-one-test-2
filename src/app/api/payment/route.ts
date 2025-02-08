// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';

// // Инициализация Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });

// // Подтверждение платежа
// export async function confirmPayment(request: NextRequest) {
//   try {
//     const { paymentIntentId } = await request.json();

//     if (!paymentIntentId) {
//       return NextResponse.json(
//         { error: 'PaymentIntent ID is required' },
//         { status: 400 }
//       );
//     }

//     const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

//     return NextResponse.json(
//       { status: paymentIntent.status },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error confirming payment:', error);

//     return NextResponse.json(
//       {
//         error: error || 'Failed to confirm payment',
//       },
//       { status: 500 }
//     );
//   }
// }

// // Создание платежного намерения
// export async function createPaymentIntent(request: NextRequest) {
//   try {
//     const { amount, currency } = await request.json();

//     if (!amount || amount <= 0) {
//       return NextResponse.json(
//         { error: 'Valid amount is required' },
//         { status: 400 }
//       );
//     }

//     if (!currency || typeof currency !== 'string') {
//       return NextResponse.json(
//         { error: 'Valid currency is required' },
//         { status: 400 }
//       );
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//     });

//     return NextResponse.json(
//       { clientSecret: paymentIntent.client_secret },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error creating payment intent:', error);

//     return NextResponse.json(
//       {
//         error: error || 'Failed to create payment intent',
//       },
//       { status: 500 }
//     );
//   }
// }

// // Роутинг в зависимости от типа действия
// export async function POST(request: NextRequest) {
//   const url = new URL(request.url);
//   const action = url.searchParams.get('action');

//   switch (action) {
//     case 'confirm':
//       return confirmPayment(request);
//     case 'create':
//       return createPaymentIntent(request);
//     default:
//       return NextResponse.json(
//         { error: 'Invalid action parameter' },
//         { status: 400 }
//       );
//   }
// }

import { CartItem } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2025-01-27.acacia',
})

export async function POST(req: NextRequest) {
	try {
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
