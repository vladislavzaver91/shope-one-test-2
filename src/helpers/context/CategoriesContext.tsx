// 'use client'

// import { createContext, ReactNode, useContext, useState } from 'react'
// import { DEFAULT_CATEGORIES } from '../variables/categories'

// interface CategoriesContextProps {
// 	categories: string[]
// 	addCategory: (category: string) => void
// }

// const CategoriesContext = createContext<CategoriesContextProps | undefined>(
// 	undefined
// )

// export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
// 	const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES)

// 	const addCategory = (category: string) => {
// 		setCategories(prev =>
// 			prev.includes(category) ? prev : [...prev, category]
// 		)
// 	}

// 	return (
// 		<CategoriesContext.Provider value={{ categories, addCategory }}>
// 			{children}
// 		</CategoriesContext.Provider>
// 	)
// }

// export const useCategories = () => {
// 	const context = useContext(CategoriesContext)
// 	if (!context) {
// 		throw new Error('useCategories must be used within a CategoriesProvider')
// 	}
// 	return context
// }
