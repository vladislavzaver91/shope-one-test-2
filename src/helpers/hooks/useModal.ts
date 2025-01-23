import { useEffect, useRef, useState } from 'react'

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	const toggleMenu = () => setIsOpen(prev => !prev)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return {
		isOpen,
		setIsOpen,
		menuRef,
		toggleMenu,
	}
}

export default useModal
