import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			gridTemplateColumns: {
				24: 'repeat(24, 1fr)',
			},
			gridColumnEnd: {
				20: '20',
			},
		},
	},
	plugins: [],
} satisfies Config
