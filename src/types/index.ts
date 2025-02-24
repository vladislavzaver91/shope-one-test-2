export interface Product {
	id: string

	title: string
	description: string
	price: number
	type: 'Digital' | 'Physical'
	category: string
	images: string[]
	attributes?: string[]
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

export type DefaultCategories = string[]

export type CategoryItems = {
	title: string
	descr?: string
	image: string
}

export type CMSSettings = {
	id: string
	font: string
	font_color: string
	accent_color: string
	accent_color_dark: string
	border_product_card: string
	border_info_card: string
	border_btn: string
	border_hero_btn: string
	border_header_input: string
	border_input: string
	created_at: string
	updated_at: string
}
