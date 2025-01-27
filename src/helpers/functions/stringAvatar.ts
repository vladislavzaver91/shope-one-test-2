export default function getUserInitials(fullName: string): string {
	if (!fullName) return ''

	const names = fullName.trim().split(' ')
	const firstNameInitial = names[0]?.charAt(0).toUpperCase() || ''
	const lastNameInitial = names[1]?.charAt(0).toUpperCase() || ''

	return lastNameInitial
		? `${firstNameInitial}${lastNameInitial}`
		: firstNameInitial
}
