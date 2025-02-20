import { useEffect, useRef, useState } from 'react'
import { DEFAULT_CATEGORIES } from '../variables/categories'

const useCategoryDropDownOnAdmin = () => {
	const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES)
	const [categoryInput, setCategoryInput] = useState<string>('')
	const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] =
		useState<boolean>(false)
	const categoryDropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				categoryDropdownRef.current &&
				!categoryDropdownRef.current.contains(event.target as Node)
			) {
				setIsCategoryDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return {
		categoryDropdownRef,
		categoryInput,
		setCategoryInput,
		categories,
		setCategories,
		isCategoryDropdownOpen,
		setIsCategoryDropdownOpen,
	}
}

export default useCategoryDropDownOnAdmin
