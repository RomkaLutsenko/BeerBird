import React from 'react'
import BoosterStatus from '../widgets/BoosterStatus'
import { Hero } from './Modals/HeroModal'

interface HeroPreviewProps {
	hero: Hero
	onHeroSelect: (hero: Hero, index: number) => void
	index: number
	heroRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

const HeroPreview: React.FC<HeroPreviewProps> = ({
	hero,
	index,
	heroRefs,
	onHeroSelect,
}) => {
	return (
		<div
			ref={el => (heroRefs.current[index] = el)}
			className='w-full flex flex-col items-center rounded-lg shadow-lg p-4 cursor-pointer transition-transform duration-300 hover:scale-105'
			onClick={() => onHeroSelect(hero, index)}
			aria-label={`Select ${hero.name}`}
		>
			<div className='text-lg font-bold text-contrastBlue mb-3'>
				{hero.name}
			</div>
			<div className='mb-2'>
				<img
					src={hero.image}
					alt={hero.name}
					className='w-[150px] h-[150px] rounded-lg object-cover'
				/>
			</div>
			<BoosterStatus
				mode='boostsPage'
				clickBoost={hero.clickBoost}
				timeBoost={hero.timeBoost}
			/>
		</div>
	)
}

export default HeroPreview
