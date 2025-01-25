import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { z } from 'zod';

const ShippingRateSchema = z.object({
  origin: z.object({
    name: z.string(),
    postalAddress: z.object({
      cityName: z.string(),
      postalCode: z.string(),
      countryCode: z.string(),
      addressLine1: z.string(),
    }),
  }),
  destination: z.object({
    name: z.string(),
    postalAddress: z.object({
      cityName: z.string(),
      postalCode: z.string(),
      countryCode: z.string(),
      addressLine1: z.string(),
    }),
  }),
  packages: z.array(
    z.object({
      weight: z.number().positive(),
      dimensions: z.object({
        length: z.number().positive(),
        width: z.number().positive(),
        height: z.number().positive(),
      }),
    })
  ),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, packages } = ShippingRateSchema.parse(body);
    console.log("Request body:", {
      customerDetails: {
        shipperDetails: origin,
        receiverDetails: destination,
      },
      plannedShippingDateAndTime: new Date().toISOString(),
      unitOfMeasurement: 'SI',
      packages: packages,
    });
    

    // Запрос к DHL API для расчета стоимости
    const response = await axios.post(
      'https://api.dhl.com/smartrucking/v1/rates',
      {
        customerDetails: {
          shipperDetails: origin,
          receiverDetails: destination,
        },
        plannedShippingDateAndTime: new Date().toISOString(),
        unitOfMeasurement: 'SI',
        packages: packages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DHL_API_KEY}`,
          
        },
      }
    );

    // Проверка на наличие данных в ответе
    if (!response.data || !Array.isArray(response.data.products)) {
      throw new Error('Invalid response from DHL API');
    }

    return NextResponse.json(response.data.products, { status: 200 });
  } catch (error) {
    console.error('Error calculating shipping rates:', error);
    return NextResponse.json(
      { error: `Failed to calculate shipping rates: ${error}` },
      { status: 500 }
    );
  }
}
