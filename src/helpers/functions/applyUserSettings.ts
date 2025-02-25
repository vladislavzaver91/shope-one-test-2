import { CMSSettings, CSS_VARIABLE_MAP } from '@/types'

export const applyUserSettings = (settings: CMSSettings) => {
	if (!settings) return
	console.log('Applying settings:', settings)

	Object.entries(settings).forEach(([key, value]) => {
		if (value && key in CSS_VARIABLE_MAP) {
			const cssVar = CSS_VARIABLE_MAP[key as keyof typeof CSS_VARIABLE_MAP]
			document.documentElement.style.setProperty(cssVar, value as string)
		}
	})

	if (settings.accentColor && settings.accentColorDark) {
		document.documentElement.style.setProperty(
			'--accent-gradient',
			`linear-gradient(to right, ${settings.accentColor}, ${settings.accentColorDark})`
		)
	}
}
