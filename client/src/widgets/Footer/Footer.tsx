import React from 'react'
import BoostsIcon from '../../shared/assets/icons/BoostsIcon'
import DinoIcon from '../../shared/assets/icons/DinoIcon'
import RatingIcon from '../../shared/assets/icons/RatingIcon'
import UserIcon from '../../shared/assets/icons/UserIcon'

interface FooterProps {
	setActiveIndex: (index: number) => void
	activeIndex: number
}

const Footer: React.FC<FooterProps> = ({ setActiveIndex, activeIndex }) => {
	// Функция для определения класса фона
	const getBackgroundClass = (index: number) => {
		return activeIndex === index ? 'bg-[#1c1f24]' : ''
	}

	// Функция для определения цвета иконки
	const getIconColor = (index: number) => {
		return activeIndex === index ? '#f3ba2f' : '#85827d'
	}

	return (
		<div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs'>
			<div
				className={`text-center w-1/5 m-1 p-2 rounded-2xl ${getBackgroundClass(
					1
				)}`}
				onClick={() => setActiveIndex(1)}
			>
				<DinoIcon className='w-8 h-8 mx-auto' color={getIconColor(1)} />
				<p className='mt-1' style={{ color: getIconColor(1) }}>
					Играть
				</p>
			</div>
			<div
				className={`text-center w-1/5 m-1 p-2 rounded-2xl ${getBackgroundClass(
					2
				)}`}
				onClick={() => setActiveIndex(2)}
			>
				<BoostsIcon className='w-8 h-8 mx-auto' color={getIconColor(2)} />
				<p className='mt-1' style={{ color: getIconColor(2) }}>
					Локации
				</p>
			</div>
			<div
				className={`text-center w-1/5 m-1 p-2 rounded-2xl ${getBackgroundClass(
					3
				)}`}
				onClick={() => setActiveIndex(3)}
			>
				<RatingIcon className='w-8 h-8 mx-auto' color={getIconColor(3)} />
				<p className='mt-1' style={{ color: getIconColor(3) }}>
					Рейтинг
				</p>
			</div>
			<div
				className={`text-center w-1/5 m-1 p-2 rounded-2xl ${getBackgroundClass(
					4
				)}`}
				onClick={() => setActiveIndex(4)}
			>
				<UserIcon className='w-8 h-8 mx-auto' color={getIconColor(4)} />
				<p className='mt-1' style={{ color: getIconColor(4) }}>
					Профиль
				</p>
			</div>
		</div>
	)
}

export default Footer
