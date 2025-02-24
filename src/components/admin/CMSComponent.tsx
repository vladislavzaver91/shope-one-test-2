import { useEffect, useState } from 'react'

const fonts = [
	'Arial',
	'Poppins',
	'Nunito',
	'Inter',
	'Roboto',
	'Montserrat',
	'Times New Roman',
]

const CMSComponent = () => {
	const [font, setFont] = useState<string>('Nunito')
	const [fontColor, setFontColor] = useState<string>('#171717')
	const [accentColor, setAccentColor] = useState<string>('#2563eb')
	const [accentColorDark, setAccentColorDark] = useState<string>('#1e40af')
	const [borderProductCard, setBorderProductCard] = useState<string>('8px')
	const [borderInfoCard, setBorderInfoCard] = useState<string>('8px')
	const [borderBtn, setBorderBtn] = useState<string>('8px')
	const [borderHeroBtn, setBorderHeroBtn] = useState<string>('50px')
	const [borderHeaderInput, setBorderHeaderInput] = useState<string>('50px')
	const [borderInput, setBorderInput] = useState<string>('8px')

	const getDarkerShade = (hex: string): string => {
		// Remove the # if present
		hex = hex.replace('#', '')

		// Convert to RGB
		let r = parseInt(hex.substring(0, 2), 16)
		let g = parseInt(hex.substring(2, 4), 16)
		let b = parseInt(hex.substring(4, 6), 16)

		// Darken by 20%
		r = Math.floor(r * 0.8)
		g = Math.floor(g * 0.8)
		b = Math.floor(b * 0.8)

		// Convert back to hex
		return (
			'#' +
			[r, g, b]
				.map(x => {
					const hex = x.toString(16)
					return hex.length === 1 ? '0' + hex : hex
				})
				.join('')
		)
	}

	// Функция для загрузки шрифта
	const loadFont = (font: string) => {
		if (['Roboto', 'Montserrat'].includes(font)) {
			const linkId = `google-font-${font}`
			if (!document.getElementById(linkId)) {
				const link = document.createElement('link')
				link.id = linkId
				link.rel = 'stylesheet'
				link.href = `https://fonts.googleapis.com/css2?family=${font.replace(
					' ',
					'+'
				)}:wght@400;700&display=swap`
				document.head.appendChild(link)
			}
		}
		document.documentElement.style.setProperty('--font-family', font)
	}

	useEffect(() => {
		const storedFont = localStorage.getItem('font')
		const storedFontColor = localStorage.getItem('fontColor')
		const storedAccentColor = localStorage.getItem('accentColor')
		const storedAccentColorDark = localStorage.getItem('accentColorDark')
		const storedBorderProductCard = localStorage.getItem('borderProductCard')
		const storedBorderInfoCard = localStorage.getItem('borderInfoCard')
		const storedBorderBtn = localStorage.getItem('borderBtn')
		const storedBorderHeroBtn = localStorage.getItem('borderHeroBtn')
		const storedBorderHeaderInput = localStorage.getItem('borderHeaderInput')
		const storedBorderInput = localStorage.getItem('borderInput')

		console.log('Loaded fontColor:', storedFontColor)

		if (storedFont) {
			setFont(storedFont)
			loadFont(storedFont)
		}
		if (storedFontColor !== null) setFontColor(storedFontColor)
		if (storedAccentColor) setAccentColor(storedAccentColor)
		if (storedAccentColorDark) setAccentColorDark(storedAccentColorDark)
		if (storedBorderProductCard) setBorderProductCard(storedBorderProductCard)
		if (storedBorderInfoCard) setBorderInfoCard(storedBorderInfoCard)
		if (storedBorderBtn) setBorderBtn(storedBorderBtn)
		if (storedBorderHeroBtn) setBorderHeroBtn(storedBorderHeroBtn)
		if (storedBorderHeaderInput) setBorderHeaderInput(storedBorderHeaderInput)
		if (storedBorderInput) setBorderInput(storedBorderInput)
	}, [])

	useEffect(() => {
		document.documentElement.style.setProperty('--font-color', fontColor)
		document.documentElement.style.setProperty(
			'--border-product-card',
			borderProductCard
		)
		document.documentElement.style.setProperty(
			'--border-info-card',
			borderInfoCard
		)
		document.documentElement.style.setProperty('--border-btn', borderBtn)
		document.documentElement.style.setProperty(
			'--border-hero-btn',
			borderHeroBtn
		)
		document.documentElement.style.setProperty(
			'--border-header-input-btn',
			borderHeaderInput
		)
		document.documentElement.style.setProperty(
			'--border-input-btn',
			borderInput
		)
	}, [
		fontColor,
		borderProductCard,
		borderInfoCard,
		borderBtn,
		borderHeroBtn,
		borderHeaderInput,
		borderInput,
	])

	useEffect(() => {
		document.documentElement.style.setProperty('--accent-color', accentColor)
		document.documentElement.style.setProperty(
			'--accent-color-dark',
			accentColorDark
		)
		document.documentElement.style.setProperty(
			'--accent-gradient',
			`linear-gradient(to right, ${accentColor}, ${accentColorDark})`
		)
	}, [accentColor, accentColorDark])

	// Когда меняется шрифт, сразу применяем его
	useEffect(() => {
		loadFont(font)
	}, [font])

	const handleAccentColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value
		setAccentColor(newColor)
		setAccentColorDark(getDarkerShade(newColor))
	}

	const handleSave = () => {
		localStorage.setItem('font', font)
		localStorage.setItem('fontColor', fontColor)
		localStorage.setItem('accentColor', accentColor)
		localStorage.setItem('accentColorDark', accentColorDark)
		localStorage.setItem('borderProductCard', borderProductCard)
		localStorage.setItem('borderInfoCard', borderInfoCard)
		localStorage.setItem('borderBtn', borderBtn)
		localStorage.setItem('borderHeroBtn', borderHeroBtn)
		localStorage.setItem('borderHeaderInput', borderHeaderInput)
		localStorage.setItem('borderInput', borderInput)
		console.log('Settings saved!')
	}

	return (
		<div className='p-6 bg-white shadow-md rounded-lg'>
			<h1 className='text-2xl font-bold mb-4'>Site Settings</h1>

			<div className='space-y-4'>
				{/* accent color */}
				<div>
					<label htmlFor='accentColor' className='block text-lg'>
						Accent Color
					</label>
					<input
						type='color'
						id='accentColor'
						value={accentColor}
						onChange={handleAccentColorChange}
						className='w-full p-2 mt-2 rounded'
					/>
					<div className='mt-2 flex gap-4'>
						<div
							className='flex-1 p-4 rounded'
							style={{ backgroundColor: accentColor }}
						>
							Primary Color
						</div>
						<div
							className='flex-1 p-4 rounded'
							style={{ backgroundColor: accentColorDark }}
						>
							Dark Shade
						</div>
					</div>
					<div
						className='w-full h-12 mt-2 rounded'
						style={{
							background: `linear-gradient(to right, ${accentColor}, ${accentColorDark})`,
						}}
					>
						Gradient Preview
					</div>
				</div>

				{/* font color */}
				<div>
					<label htmlFor='fontColor' className='block text-lg'>
						Font Color
					</label>
					<input
						type='color'
						id='fontColor'
						value={fontColor}
						onChange={e => setFontColor(e.target.value)}
						className='w-full p-2 mt-2 rounded'
					/>
				</div>

				{/* font */}
				<div>
					<label htmlFor='font' className='block text-lg'>
						Font
					</label>
					<select
						id='font'
						value={font}
						onChange={e => setFont(e.target.value)}
						className='w-full p-2 mt-2 rounded'
					>
						{fonts.map(font => (
							<option key={font} value={font}>
								{font}
							</option>
						))}
					</select>
				</div>

				{/* border radius */}
				<div>
					<label htmlFor='borderProductCard' className='block text-lg'>
						Border radius for Product card
					</label>
					<input
						type='number'
						id='borderProductCard'
						value={parseInt(borderProductCard)}
						onChange={e => setBorderProductCard(e.target.value + 'px')}
						className='w-full p-2 mt-2 rounded'
					/>
				</div>

				<div>
					<label htmlFor='borderInfoCard' className='block text-lg'>
						Border radius for Info card
					</label>
					<input
						type='number'
						id='borderInfoCard'
						value={parseInt(borderInfoCard)}
						onChange={e => setBorderInfoCard(e.target.value + 'px')}
						className='w-full p-2 mt-2 rounded'
					/>
				</div>

				<div>
					<label htmlFor='borderBtn' className='block text-lg'>
						Border radius for Buttons
					</label>
					<input
						type='number'
						id='borderBtn'
						value={parseInt(borderBtn)}
						onChange={e => setBorderBtn(e.target.value + 'px')}
						className='w-full p-2 mt-2 rounded'
					/>
				</div>

				<div>
					<label htmlFor='borderHeroBtn' className='block text-lg'>
						Border radius for Hero Buttons
					</label>
					<input
						type='number'
						id='borderHeroBtn'
						value={parseInt(borderHeroBtn)}
						onChange={e => setBorderHeroBtn(e.target.value + 'px')}
						className='w-full p-2 mt-2 rounded'
					/>
				</div>

				<div>
					<label htmlFor='borderHeaderInput' className='block text-lg'>
						Border radius for Header Input
					</label>
					<input
						type='number'
						id='borderHeaderInput'
						value={parseInt(borderHeaderInput)}
						onChange={e => setBorderHeaderInput(e.target.value + 'px')}
						className='w-full p-2 mt-2 rounded'
					/>
				</div>

				<div>
					<label htmlFor='borderInput' className='block text-lg'>
						Border radius for basic Input
					</label>
					<input
						type='number'
						id='borderInput'
						value={parseInt(borderInput)}
						onChange={e => setBorderInput(e.target.value + 'px')}
						className='w-full p-2 mt-2 rounded'
					/>
				</div>

				<div className='mt-6'>
					<button
						onClick={handleSave}
						className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
					>
						Save Settings
					</button>
				</div>
			</div>
		</div>
	)
}

export default CMSComponent
