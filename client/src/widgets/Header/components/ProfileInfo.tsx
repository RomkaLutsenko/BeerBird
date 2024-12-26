import React from 'react'
import Compass from '../../../shared/assets/icons/Compass'
import IncomeInfo from './IncomeInfo'

interface ProfileInfoProps {
	nowScore: number
}

const ProfileInfo: React.FC<ProfileInfoProps> = props => {
	const { nowScore } = props
	return (
		<div className='flex items-center space-x-2 justify-between'>
			<div className='flex'>
				<a
					className='rounded-lg bg-[#1d2025]'
					href='https://m.vk.com/romanlutsenk0'
					target='_blank' // Открытие ссылки в новой вкладке
					rel='noopener noreferrer' // Безопасность при открытии новой вкладки
				>
					<Compass size={24} className='text-[#d4d4d4]' />
				</a>
				<p className='text-base ml-2'>BeerBird</p>
			</div>
			<div className='flex items-center border-2 border-[#43433b] rounded-full px-8 py-[2px] bg-[#43433b]/[0.6] max-w-48'>
				<IncomeInfo nowScore={nowScore} />
			</div>
			<div>
				<a
					href='https://m.vk.com/romanlutsenk0'
					target='_blank' // Открытие ссылки в новой вкладке
					rel='noopener noreferrer' // Безопасность при открытии новой вкладки
				>
					<p className='text-base'>LGD</p>
				</a>
			</div>
		</div>
	)
}

export default ProfileInfo
