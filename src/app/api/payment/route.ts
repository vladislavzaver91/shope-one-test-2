import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Инициализация Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });

// Подтверждение платежа
export async function confirmPayment(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'PaymentIntent ID is required' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    return NextResponse.json(
      { status: paymentIntent.status },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error confirming payment:', error);

    return NextResponse.json(
      {
        error: error || 'Failed to confirm payment',
      },
      { status: 500 }
    );
  }
}

// Создание платежного намерения
export async function createPaymentIntent(request: NextRequest) {
  try {
    const { amount, currency } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      );
    }

    if (!currency || typeof currency !== 'string') {
      return NextResponse.json(
        { error: 'Valid currency is required' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating payment intent:', error);

    return NextResponse.json(
      {
        error: error || 'Failed to create payment intent',
      },
      { status: 500 }
    );
  }
}

// Роутинг в зависимости от типа действия
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  switch (action) {
    case 'confirm':
      return confirmPayment(request);
    case 'create':
      return createPaymentIntent(request);
    default:
      return NextResponse.json(
        { error: 'Invalid action parameter' },
        { status: 400 }
      );
  }
}
