import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const orderId = request.url.split("/").pop(); // Получаем ID из URL

    const orderItem = await prisma.orderItem.findMany({
      where: { orderId: orderId },
      include: {
        product: true, // Включаем информацию о продукте
      },
    });

    if (!orderItem) {
      return NextResponse.json({ error: "Order item not found" }, { status: 404 });
    }

    return NextResponse.json(orderItem);
  } catch (error) {
    console.error("Error fetching order item:", error);
    return NextResponse.json(
      { error: "Failed to fetch order item" },
      { status: 500 }
    );
  }
}
