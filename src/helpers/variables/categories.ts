import { CategoryItems, DefaultCategories } from '@/types'

export const DEFAULT_CATEGORIES: DefaultCategories = [
	'Electronics',
	'Clothing',
	'E-books',
	'Home Goods',
	'Software',
	'Music',
]

export const CATEGORY_ITEMS: CategoryItems[] = [
	{
		title: 'E-books',
		descr:
			'Discover a vast collection of e-books across all genres. Instant access, no shipping required.',
		image: '/ebooks.png',
	},
	{
		title: 'Software',
		descr:
			'From productivity tools to creative software, get the apps you need to achieve your goals.',
		image: '/software.png',
	},
	{
		title: 'Music',
		descr:
			'Download high-quality music tracks or albums. Your favorite tunes, always with you.',
		image: '/music.png',
	},
	{
		title: 'Electronics',
		descr:
			'Upgrade your tech with the latest gadgets and devices for work or entertainment.',
		image: '/electronics.png',
	},
	{
		title: 'Clothing',
		descr:
			'Stay stylish with our premium clothing selection. Fashion for every season and occasion.',
		image: '/clothing.png',
	},
	{
		title: 'Home Goods',
		descr:
			'Transform your space with high-quality home essentials and decor. Comfort meets design.',
		image: '/homegoods.png',
	},
]
