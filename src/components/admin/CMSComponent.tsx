import { useEffect, useState } from 'react'

const CMSComponent = () => {
	const [themeColor, setThemeColor] = useState<string>('#1d4ed8') // Основной цвет
	const [font, setFont] = useState<string>('Arial')
	const [borderRadius, setBorderRadius] = useState<string>('8px')
	const [siteText, setSiteText] = useState<string>('Welcome to our site!')

	// Эффект, чтобы при загрузке компонента применить сохраненные значения
	useEffect(() => {
		const storedThemeColor = localStorage.getItem('themeColor')
		const storedFont = localStorage.getItem('font')
		const storedBorderRadius = localStorage.getItem('borderRadius')
		const storedSiteText = localStorage.getItem('siteText')

		if (storedThemeColor) setThemeColor(storedThemeColor)
		if (storedFont) setFont(storedFont)
		if (storedBorderRadius) setBorderRadius(storedBorderRadius)
		if (storedSiteText) setSiteText(storedSiteText)

		// Применяем сохраненные стили
		document.documentElement.style.setProperty('--theme-color', themeColor)
		document.documentElement.style.setProperty('--font-family', font)
		document.documentElement.style.setProperty('--border-radius', borderRadius)
	}, [themeColor, font, borderRadius])

	const handleSave = () => {
		localStorage.setItem('themeColor', themeColor)
		localStorage.setItem('font', font)
		localStorage.setItem('borderRadius', borderRadius)
		localStorage.setItem('siteText', siteText)
		alert('Settings saved!')

		// Применяем изменения сразу после сохранения
		document.documentElement.style.setProperty('--theme-color', themeColor)
		document.documentElement.style.setProperty('--font-family', font)
		document.documentElement.style.setProperty('--border-radius', borderRadius)
	}

	return (
		<div className='p-6 bg-white shadow-md rounded-lg'>
			<h1 className='text-2xl font-bold mb-4'>Site Settings</h1>

			<div className='space-y-4'>
				<div>
					<label htmlFor='themeColor' className='block text-lg'>
						Theme Color
					</label>
					<input
						type='color'
						id='themeColor'
						value={themeColor}
						onChange={e => setThemeColor(e.target.value)}
						className='w-full p-2 mt-2 rounded'
					/>
				</div>

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
						<option value='Arial'>Arial</option>
						<option value='Verdana'>Verdana</option>
						<option value='Georgia'>Georgia</option>
						<option value='Times New Roman'>Times New Roman</option>
					</select>
				</div>

				<div>
					<label htmlFor='borderRadius' className='block text-lg'>
						Border Radius
					</label>
					<input
						type='number'
						id='borderRadius'
						value={parseInt(borderRadius)}
						onChange={e => setBorderRadius(e.target.value + 'px')}
						className='w-full p-2 mt-2 rounded'
					/>
				</div>

				<div>
					<label htmlFor='siteText' className='block text-lg'>
						Site Text
					</label>
					<textarea
						id='siteText'
						value={siteText}
						onChange={e => setSiteText(e.target.value)}
						rows={4}
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
