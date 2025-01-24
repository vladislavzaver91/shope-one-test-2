interface FiltersProps {
	onFilter: (key: string, value: string) => void
}

const Filters = ({ onFilter }: FiltersProps) => {
	return (
		<div className='p-2 bg-white rounded-lg shadow-md flex gap-4 justify-between items-center'>
			<h3 className='text-lg font-semibold'>Filters</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				<select
					className='w-full h-full p-2 border rounded mb-4'
					onChange={e => onFilter('category', e.target.value)}
				>
					<option value=''>All Categories</option>
					<option value='Electronics'>Electronics</option>
					<option value='Books'>Books</option>
					<option value='Software'>Software</option>
				</select>
				<input
					type='number'
					placeholder='Max Price'
					className='w-full h-full p-2 border rounded'
					onChange={e => onFilter('price', e.target.value)}
				/>
				<select
					className='w-full h-full p-2 border rounded'
					onChange={e => onFilter('sort', e.target.value)}
				>
					<option value=''>Sort By</option>
					<option value='price'>Price (Low to High)</option>
					<option value='popularity'>Popularity</option>
				</select>
			</div>
		</div>
	)
}

export default Filters
