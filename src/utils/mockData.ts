export interface Product {
	id: string
	name: string
	description: string
	price: number
	popularity: number
	image: string
	images?: string[]
	category: string
	type: string
}

export const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
	id: `Product ${i + 1}`,
	name: `Product ${i + 1}`,
	description: `This is a description of product ${
		i + 1
	}. Perfect for both personal and professional use.`,
	price: parseFloat((Math.random() * 500).toFixed(2)),
	popularity: Math.floor(Math.random() * 100),
	image: '/watch.jpg',
	images: ['/watch-1.jpg', '/watch-2.jpg', '/watch-3.jpg'],
	category: i % 3 === 0 ? 'Electronics' : i % 3 === 1 ? 'Books' : 'Software',
	type: i % 2 === 0 ? 'Physical' : 'Digital',
}))
