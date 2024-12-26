import React from 'react'
import BoosterStatus from '../../widgets/BoosterStatus'
import ModalLayout from './ModalLayout'

export interface Hero {
	name: string
	image: string
	description: string
	secretDescription: string
	clickBoost: number
	timeBoost: number
	cost: number
	isPurchased: boolean
}

interface HeroModalProps {
	hero: Hero
	visible: boolean
	onHide: () => void
}

const HeroModal: React.FC<HeroModalProps> = ({ hero, visible, onHide }) => {
	return (
		<ModalLayout visible={visible} onHide={onHide}>
			<div className='text-2xl text-contrastBlue mb-4'>{hero.name}</div>
			<img
				src={hero.image}
				alt={hero.name}
				className='w-full h-auto rounded-lg mb-4'
			/>
			<div className='text-white text-left mb-4'>{hero.description}</div>
			<div className='text-contrastBlue text-left mb-4'>
				{hero.secretDescription}
			</div>
			<div className='flex justify-center items-center mt-4'>
				<BoosterStatus
					mode='boostsPage'
					clickBoost={hero.clickBoost}
					timeBoost={hero.timeBoost}
				/>
			</div>
		</ModalLayout>
	)
}

export default HeroModal
