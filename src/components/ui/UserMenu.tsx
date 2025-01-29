'use client'

import getUserInitials from '@/helpers/functions/stringAvatar'
import useModal from '@/helpers/hooks/useModal'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { FaCog, FaSignOutAlt, FaUser, FaUserPlus } from 'react-icons/fa'

interface UserMenuProps {
	userName: string | null
	onLogout: () => void
}

const UserMenu = ({ userName, onLogout }: UserMenuProps) => {
	const { isOpen, menuRef, toggleMenu } = useModal()

	const handleLogout = () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('userName')
		toggleMenu()
		onLogout()
	}

	return (
		<div className='relative' ref={menuRef}>
			<button
				onClick={toggleMenu}
				className='flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full'
				style={{
					backgroundColor: '#4A90E2',
				}}
			>
				<span className='text-base md:text-lg font-semibold text-gray-700'>
					{getUserInitials(userName || '')}
				</span>
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
							<Link
								href='/user-account'
								onClick={toggleMenu}
								className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'
							>
								<FaUser className='w-5 h-5 mr-3' />
								Profile
							</Link>
						</li>
						<li>
							<Link
								href='#'
								onClick={toggleMenu}
								className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'
							>
								<FaUserPlus className='w-5 h-5 mr-3' />
								My Account
							</Link>
						</li>
						<li>
							<hr className='my-2 border-gray-300' />
						</li>
						<li>
							<Link
								href='#'
								onClick={toggleMenu}
								className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'
							>
								<FaCog className='w-5 h-5 mr-3' />
								Settings
							</Link>
						</li>
						<li>
							<Link
								href='/'
								onClick={handleLogout}
								className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'
							>
								<FaSignOutAlt className='w-5 h-5 mr-3' />
								Logout
							</Link>
						</li>
					</ul>
				</div>
			</Transition>
		</div>
	)
}

export default UserMenu
