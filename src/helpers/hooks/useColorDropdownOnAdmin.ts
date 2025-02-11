import { useEffect, useRef, useState } from 'react'

const useColorDropdownOnAdmin = () => {
	const [isColorDropdownOpen, setIsColorDropdownOpen] = useState<boolean>(false)
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsColorDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return {
		isColorDropdownOpen,
		setIsColorDropdownOpen,
		dropdownRef,
	}
}

export default useColorDropdownOnAdmin
