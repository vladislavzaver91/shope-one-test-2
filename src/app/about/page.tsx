'use client'

import { motion } from 'framer-motion'

export default function About() {
	return (
		<div className='heading-section relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-7'>
			{/* Background Decorations */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 0.15, scale: 1 }}
				transition={{ duration: 1 }}
				className='absolute inset-0 -z-10'
			>
				<div className='absolute top-10 left-10 w-40 h-40 bg-blue-300 rounded-full blur-2xl'></div>
				<div className='absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full blur-2xl'></div>
				<div className='absolute top-1/2 left-1/2 w-24 h-24 bg-blue-200 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2'></div>
			</motion.div>

			<motion.section
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='container mx-auto max-w-4xl bg-white p-8 rounded-xl shadow-lg space-y-8'
			>
				{/* Title */}
				<motion.h1
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='font-[family-name:var(--font-nunito-sans)] tracking-wider text-[32px] font-bold text-[var(--title-color)] text-center'
				>
					About Us
				</motion.h1>

				{/* Intro Text */}
				<motion.p
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='text-[#455a64] text-center'
				>
					Welcome to our e-commerce store! We offer a wide range of products,
					including both digital downloads and physical goods. Our mission is to
					provide high-quality products at competitive prices while ensuring a
					seamless shopping experience for our customers.
				</motion.p>

				{/* Our Mission */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h2 className='text-lg font-semibold text-[var(--title-color)]'>
						Our Mission
					</h2>
					<p className='text-[#455a64]'>
						Our mission is to empower consumers by providing access to a diverse
						selection of products that enhance their lives. We believe in
						transparency, quality, and excellent customer service.
					</p>
				</motion.div>

				{/* What We Offer */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h2 className='text-lg font-semibold text-[var(--title-color)]'>
						What We Offer
					</h2>
					<ul className='list-disc list-inside text-[#455a64] space-y-2'>
						<li>Digital Products: E-books, software, music, and more.</li>
						<li>
							Physical Goods: Electronics, clothing, home goods, and more.
						</li>
						<li>
							Exceptional Customer Service: Our support team is here to help you
							with any inquiries.
						</li>
					</ul>
				</motion.div>

				{/* Why Choose Us */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h2 className='text-lg font-semibold text-[var(--title-color)]'>
						Why Choose Us?
					</h2>
					<p className='text-[#455a64]'>
						We prioritize customer satisfaction and strive to offer the best
						shopping experience possible. With secure payment options and fast
						shipping for physical products, we aim to exceed your expectations.
					</p>
				</motion.div>
			</motion.section>
		</div>
	)
}

// // About.js
// 'use client'

// export default function About() {
// 	return (
// 		<div className='heading-section min-h-screen bg-white p-7'>
// 			<section className='container mx-auto max-w-4xl'>
// 				<h1 className='text-[32px] font-bold text-[var(--title-color)] mb-8'>About Us</h1>

// 				<div className='space-y-8'>
// 					<p className='text-[#455a64]'>
// 						Welcome to our e-commerce store! We offer a wide range of products,
// 						including both digital downloads and physical goods. Our mission is
// 						to provide high-quality products at competitive prices while
// 						ensuring a seamless shopping experience for our customers.
// 					</p>

// 					<h2 className='text-lg font-semibold text-[var(--title-color)]'>Our Mission</h2>
// 					<p className='text-[#455a64]'>
// 						Our mission is to empower consumers by providing access to a diverse
// 						selection of products that enhance their lives. We believe in
// 						transparency, quality, and excellent customer service.
// 					</p>

// 					<h2 className='text-lg font-semibold text-[var(--title-color)]'>
// 						What We Offer
// 					</h2>
// 					<ul className='list-disc list-inside text-[#455a64] space-y-2'>
// 						<li>Digital Products: E-books, software, music, and more.</li>
// 						<li>
// 							Physical Goods: Electronics, clothing, home goods, and more.
// 						</li>
// 						<li>
// 							Exceptional Customer Service: Our support team is here to help you
// 							with any inquiries.
// 						</li>
// 					</ul>

// 					<h2 className='text-lg font-semibold text-[var(--title-color)]'>
// 						Why Choose Us?
// 					</h2>
// 					<p className='text-[#455a64]'>
// 						We prioritize customer satisfaction and strive to offer the best
// 						shopping experience possible. With secure payment options and fast
// 						shipping for physical products, we aim to exceed your expectations.
// 					</p>
// 				</div>
// 			</section>
// 		</div>
// 	)
// }
