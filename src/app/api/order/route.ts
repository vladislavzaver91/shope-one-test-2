import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("user-id");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { productIds, deliveryAddressId, cartItems } = body;

    if (
      !productIds ||
      productIds.length === 0 ||
      !cartItems ||
      cartItems.length === 0 ||
      !deliveryAddressId
    ) {
      return NextResponse.json(
        { error: "Product IDs and delivery address are required" },
        { status: 400 }
      );
    }

    // Проверяем, существует ли адрес с переданным ID
    const existingAddress = await prisma.address.findUnique({
      where: { id: deliveryAddressId },
    });

    if (!existingAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    // Создаем новый заказ
    const newOrder = await prisma.order.create({
      data: {
        userId,
        deliveryAddressId,
        status: "Pending",
        // Создание связанных записей в orderItems
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.id, // id продукта
            quantity: item.quantity, // количество товара
            selectedColor: item.selectedColor || "", // выбранный цвет
          })),
        },
      },
      include: {
        deliveryAddress: true, // включаем адрес доставки
        orderItems: {
          include: {
            product: true, // включаем детали товара
          },
        },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    // Получение всех заказов с деталями о товарах и адресах
    const orders = await prisma.order.findMany({
      include: {
        deliveryAddress: true,
        orderItems: { include: { product: true } },
      },
    });

    if (orders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Отключаемся от базы данных после выполнения запроса
  }
}
