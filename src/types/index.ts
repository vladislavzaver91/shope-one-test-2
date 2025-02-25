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
	id?: string
	font: string
	fontPrimeColor: string
	fontSecondColor: string
	titleColor: string
	arrowSliderColor: string
	accentColor: string
	accentColorDark: string
	borderProductCard: string
	borderInfoCard: string
	borderBtn: string
	borderHeroBtn: string
	borderHeaderInput: string
	borderInput: string
	createdAt?: Date
	updatedAt?: Date
}

// CSS variable mapping
export const CSS_VARIABLE_MAP: Record<
	keyof Omit<CMSSettings, 'id' | 'createdAt' | 'updatedAt'>,
	string
> = {
	font: '--font-family',
	fontPrimeColor: '--font-prime-color',
	fontSecondColor: '--font-second-color',
	titleColor: '--title-color',
	arrowSliderColor: '--arrow-slider-color',
	accentColor: '--accent-color',
	accentColorDark: '--accent-color-dark',
	borderProductCard: '--border-product-card',
	borderInfoCard: '--border-info-card',
	borderBtn: '--border-btn',
	borderHeroBtn: '--border-hero-btn',
	borderHeaderInput: '--border-header-input',
	borderInput: '--border-input',
}
