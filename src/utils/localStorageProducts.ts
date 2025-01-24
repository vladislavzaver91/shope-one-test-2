import mockData from '../data/mockData.json'

export const initializeProducts = () => {
	const existingProducts = localStorage.getItem('products')
	if (!existingProducts) {
		localStorage.setItem('products', JSON.stringify(mockData))
	}
}

export const getProductsFromLocalStorage = () => {
	const products = localStorage.getItem('products')
	return products ? JSON.parse(products) : []
}
