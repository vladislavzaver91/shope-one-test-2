export const truncateDescription = (
	description: string,
	wordLimit: number
): string => {
	if (!description) return ''
	const words = description.split(' ')
	if (words.length > wordLimit) {
		return words.slice(0, wordLimit).join(' ') + '...'
	}
	return description
}
