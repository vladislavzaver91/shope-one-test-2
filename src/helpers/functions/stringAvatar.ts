const getUserInitials = (fullName: string): string => {
	if (!fullName) return ''

	const names = fullName.trim().split(' ')
	const firstNameInitial = names[0]?.charAt(0).toUpperCase() || ''
	const lastNameInitial = names[1]?.charAt(0).toUpperCase() || ''

	return lastNameInitial
		? `${firstNameInitial}${lastNameInitial}`
		: firstNameInitial
}

const getRandomColor = (): string => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

export { getRandomColor, getUserInitials }
