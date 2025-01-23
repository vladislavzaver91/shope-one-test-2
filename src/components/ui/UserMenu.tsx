'use client'

import useModal from '@/helpers/hooks/useModal'
import { Transition } from '@headlessui/react'
import { FaCog, FaSignOutAlt, FaUser, FaUserPlus } from 'react-icons/fa'

const UserMenu = () => {
	const { isOpen, menuRef, toggleMenu } = useModal()

	return (
		<div className='relative' ref={menuRef}>
			<button
				onClick={toggleMenu}
				className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full'
			>
				<span className='text-lg font-semibold text-gray-700'>A</span>
			</button>
			<Transition
				show={isOpen}
				enter='transition ease-out duration-200'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-150'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10'>
					<ul className='py-2'>
						<li>
							<a
								href='#'
								className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'
							>
								<FaUser className='w-5 h-5 mr-3' />
								Profile
							</a>
						</li>
						<li>
							<a
								href='#'
								className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'
							>
								<FaUserPlus className='w-5 h-5 mr-3' />
								My Account
							</a>
						</li>
						<li>
							<hr className='my-2 border-gray-300' />
						</li>
						<li>
							<a
								href='#'
								className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'
							>
								<FaCog className='w-5 h-5 mr-3' />
								Settings
							</a>
						</li>
						<li>
							<a
								href='#'
								className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'
							>
								<FaSignOutAlt className='w-5 h-5 mr-3' />
								Logout
							</a>
						</li>
					</ul>
				</div>
			</Transition>
		</div>
	)
}

export default UserMenu
