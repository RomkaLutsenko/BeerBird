import React from 'react'
import BoosterStatus from '../../widgets/BoosterStatus'
import { Hero } from './HeroModal'
import ModalLayout from './ModalLayout'

interface HeroBuyModalProps {
	hero: Hero
	visible: boolean
	onHide: () => void
	onBuy: (hero: Hero) => void
}

const HeroBuyModal: React.FC<HeroBuyModalProps> = ({
	hero,
	visible,
	onHide,
	onBuy,
}) => {
	return (
		<ModalLayout onHide={onHide} visible={visible}>
			<div className='text-2xl text-contrastBlue mb-4'>{hero.name}</div>
			<img
				src={hero.image}
				alt={hero.name}
				className='w-full h-auto rounded-lg mb-4'
			/>
			<div className='text-white text-left mb-4'>{hero.description}</div>
			<BoosterStatus
				mode='boostsPage'
				clickBoost={hero.clickBoost}
				timeBoost={hero.timeBoost}
			/>
			<div className='flex justify-center items-center mt-5 text-sm text-white'>
				Покупай бойца, чтобы узнать больше секретиков!
			</div>
			<div className='flex justify-center items-center mt-5'>
				<button
					className='bg-contrastBlue text-gray-900 py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-blue-600'
					onClick={() => onBuy(hero)}
				>
					Купить за {hero.cost} DP
				</button>
			</div>
		</ModalLayout>
	)
}

export default HeroBuyModal
