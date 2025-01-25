export interface Product {
	id: string
	name: string
	description: string
	price: number
	popularity: number
	color: string
	capacityAvailable: string[]
	colorsAvailable: string[]
	image: string
	images: string[]
	category: string
	type: string
	quantity?: number
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
