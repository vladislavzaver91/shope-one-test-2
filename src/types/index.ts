export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "Digital" | "Physical";
  category: string;
  images: string[];
  colorsAvailable: string[],
  quantity: number;
  weight?: number;
  dimensions?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type Order = {
	id: string
	date: string
	paymentMethod?: string
	shippingData?: Address
	cartItems: Product[]
}

export type Address = {
	address: string
	city: string
	country: string
	fullName?: string
	zipCode: string
}
