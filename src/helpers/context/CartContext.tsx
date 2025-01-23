'use client'

import { Product } from '@/utils/mockData'
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

interface CartItem extends Product {
	quantity: number
}

interface CartContextType {
	cart: CartItem[]
	addToCart: (product: Product, quantity: number) => void
	updateQuantity: (id: string, quantity: number) => void
	removeFromCart: (id: string) => void
	clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_KEY = 'shopping-cart'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [cart, setCart] = useState<CartItem[]>([])

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
		setCart(storedCart)
	}, [])

	const saveCart = (cart: CartItem[]) => {
		setCart(cart)
		localStorage.setItem(CART_KEY, JSON.stringify(cart))
	}

	const addToCart = (product: Product, quantity: number) => {
		const existingItem = cart.find(item => item.id === product.id)
		if (existingItem) {
			existingItem.quantity += quantity
		} else {
			cart.push({ ...product, quantity })
		}
		saveCart([...cart])
	}

	const updateQuantity = (id: string, quantity: number) => {
		const updatedCart = cart.map(item =>
			item.id === id ? { ...item, quantity } : item
		)
		saveCart(updatedCart)
	}

	const removeFromCart = (id: string) => {
		const updatedCart = cart.filter(item => item.id !== id)
		saveCart(updatedCart)
	}

	const clearCart = () => {
		saveCart([])
	}

	const value = useMemo(
		() => ({ cart, addToCart, updateQuantity, removeFromCart, clearCart }),
		[cart]
	)

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
