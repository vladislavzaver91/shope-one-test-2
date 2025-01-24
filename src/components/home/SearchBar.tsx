interface SearchBarProps {
	onSearch: (value: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
	return (
		<input
			type='text'
			placeholder='Search products...'
			className='w-full p-3 border rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300'
			onChange={e => onSearch(e.target.value)}
		/>
	)
}

export default SearchBar
