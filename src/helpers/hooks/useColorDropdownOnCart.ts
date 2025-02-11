import { useEffect, useState } from 'react'

const useColorDropdownOnCart = () => {
	const [openColorSelect, setOpenColorSelect] = useState<
		Record<string, boolean>
	>({})

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement

			if (
				!target.closest('[data-color-select]') &&
				!target.closest('[data-color-button]')
			) {
				setOpenColorSelect({})
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return {
		openColorSelect,
		setOpenColorSelect,
	}
}

export default useColorDropdownOnCart
