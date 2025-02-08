export interface Product {
	id: string
	title: string
	description: string
	price: number
	type: 'Digital' | 'Physical'
	category: string
	images: string[]
	colorsAvailable: string[]
	color: string
	quantity: number
	weight?: number | null
	dimensions?: string | null
	createdAt: Date // Измените на Date
	updatedAt: Date // Измените на Date
}

export type Order = {
	id: string
	userId: string
	productId?: string
	deliveryAddress: string
	status: 'Pending' | 'Completed' | 'Canceled'
	createdAt: string
	updatedAt: string
	paymentMethod?: string
	productIds: string[]
	// shippingData?: Address
	// cartItems: Product[]
}

export type Address = {
	id: string
	name: string
	address: string
	city: string
	postalCode: string
	country: string
	isDefault?: boolean
}

export type CartItem = {
	title: string
	description?: string
	image?: string
	price: number
	quantity?: number
}
