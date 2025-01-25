import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    // Найти заказ в базе данных
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, products: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Фильтровать только физические товары
    const physicalProducts = order.products.filter(
      (product) => product.type === "Physical"
    );

    if (physicalProducts.length === 0) {
      return NextResponse.json(
        { error: "No physical products to ship" },
        { status: 400 }
      );
    }

    // Разделение адреса на город и почтовый код
    const [addressLine1, postalCode = "00000"] = order.deliveryAddress.split(',').map((part) => part.trim());

    // Подготовка данных для DHL API
    const payload = {
      customerDetails: {
        shipperDetails: {
          name: "Your Company",
          postalAddress: {
            cityName: "Your City",
            postalCode: "12345",
            countryCode: "US",
            addressLine1: "123 Main St",
          },
        },
        receiverDetails: {
          name: order.user.name,
          postalAddress: {
            cityName: "Destination City",
            postalCode,
            countryCode: "US",
            addressLine1,
          },
        },
      },
      plannedShippingDateAndTime: new Date().toISOString(),
      unitOfMeasurement: "SI",
      packages: physicalProducts.map((product) => ({
        weight: product.weight || 1, // Используем вес продукта или значение по умолчанию
        dimensions: product.dimensions
          ? {
              length: parseFloat(product.dimensions.split('x')[0]),
              width: parseFloat(product.dimensions.split('x')[1]),
              height: parseFloat(product.dimensions.split('x')[2]),
            }
          : {
              length: 10,
              width: 10,
              height: 10,
            }, // Используем указанные размеры или значение по умолчанию
        customerReferences: [product.title],
      })),
    };

    // Запрос в DHL API
    const response = await axios.post(
      "https://api-mock.dhl.com/mydhlapi/shipments",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.DHL_API_KEY}`,
          
        },
      }
    );

    // Проверка на успешный ответ от DHL API
    if (!response.data || !response.data.trackingId) {
      throw new Error('Failed to create shipment');
    }

    // Сохранение информации о доставке в базе данных
    const shipment = await prisma.delivery.create({
      data: {
        orderId: order.id,
        cost: response.data.totalPrice || 0, // Цена доставки из ответа DHL
        carrier: "DHL",
        trackingId: response.data.trackingId,
        status: "Pending",
      },
    });

    return NextResponse.json({ shipment }, { status: 200 });
  } catch (error) {
    console.error("Error creating shipment:", error);
    return NextResponse.json(
      { error: `Failed to create shipment: ${error}` },
      { status: 500 }
    );
  }
}
