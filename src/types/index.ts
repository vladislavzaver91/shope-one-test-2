export interface Product {
	id: string
	title: string
	description: string
	price: number
	type: 'Digital' | 'Physical'
	category: string
	images: string[]
	colorsAvailable: string[]
	quantity: number
	weight?: number | null
	dimensions?: string | null
	createdAt: Date // Измените на Date
	updatedAt: Date // Измените на Date
}

export type Order = {
	id: string
	userId: string
	productId: string
	deliveryAddress: string
	status: 'Pending' | 'Completed' | 'Canceled'
	createdAt: string
	updatedAt: string
	paymentMethod?: string
	// shippingData?: Address
	cartItems: Product[]
}

export type Address = {
	address: string
	city: string
	country: string
	zipCode: string
}
