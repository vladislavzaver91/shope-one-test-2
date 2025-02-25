'use client'

import { motion } from 'framer-motion'
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

export default function Contact() {
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
				<motion.h1
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='font-[family-name:var(--font-nunito-sans)] tracking-wider text-[32px] font-bold text-[var(--title-color)] mb-8 text-center'
				>
					Contact Us
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='text-[#455a64] text-center'
				>
					We would love to hear from you! If you have any questions or need
					assistance, please reach out to us using the contact details below.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='space-y-6'
				>
					{/* Phone */}
					<div className='flex items-center space-x-4'>
						<FaPhoneAlt className='h-8 w-8 text-[var(--title-color)]' />
						<div>
							<h2 className='text-lg font-semibold text-[var(--title-color)]'>
								Phone
							</h2>
							<p className='text-[#455a64]'>+1 (234) 567-890</p>
						</div>
					</div>

					{/* Email */}
					<div className='flex items-center space-x-4'>
						<FaEnvelope className='h-8 w-8 text-[var(--title-color)]' />
						<div>
							<h2 className='text-lg font-semibold text-[var(--title-color)]'>
								Email
							</h2>
							<p className='text-[#455a64]'>support@yourstore.com</p>
						</div>
					</div>

					{/* Business Hours */}
					<div>
						<h2 className='text-lg font-semibold text-[var(--title-color)]'>
							Business Hours
						</h2>
						<p className='text-[#455a64]'>Monday - Friday: 9 AM - 5 PM</p>
						<p className='text-[#455a64]'>Saturday - Sunday: Closed</p>
					</div>

					{/* Follow Us */}
					<div>
						<h2 className='text-lg font-semibold text-[var(--title-color)]'>
							Follow Us
						</h2>
						<p className='text-[#455a64]'>
							Stay connected through our social media channels for updates and
							promotions!
						</p>
					</div>
				</motion.div>
			</motion.section>
		</div>
	)
}

// // Contact.js
// 'use client'

// import React from 'react';
// import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

// export default function Contact() {
//   return (
//     <div className="min-h-screen bg-white p-7">
//       <section className="container mx-auto max-w-4xl">
//         <h1 className="text-[32px] font-bold text-[var(--title-color)] mb-8">Contact Us</h1>

//         <div className="space-y-8">
//           <p className="text-[#455a64]">
//             We would love to hear from you! If you have any questions or need assistance, please reach out to us using the contact details below.
//           </p>

//           <div className="flex items-start space-x-4">
//             <FaPhoneAlt className="h-6 w-6 text-[var(--title-color)]" />
//             <div>
//               <h2 className="text-lg font-semibold text-[var(--title-color)]">Phone</h2>
//               <p className="text-[#455a64]">+1 (234) 567-890</p>
//             </div>
//           </div>

//           <div className="flex items-start space-x-4">
//             <FaEnvelope className="h-6 w-6 text-[var(--title-color)]" />
//             <div>
//               <h2 className="text-lg font-semibold text-[var(--title-color)]">Email</h2>
//               <p className="text-[#455a64]">support@yourstore.com</p>
//             </div>
//           </div>

//           <h2 className="text-lg font-semibold text-[var(--title-color)]">Business Hours</h2>
//           <p className="text-[#455a64]">Monday - Friday: 9 AM - 5 PM</p>
//           <p className="text-[#455a64]">Saturday - Sunday: Closed</p>

//           <h2 className="text-lg font-semibold text-[var(--title-color)]">Follow Us</h2>
//           <p className="text-[#455a64]">Stay connected through our social media channels for updates and promotions!</p>
//         </div>
//       </section>
//     </div>
//   );
// }
