import { ScrollPanel } from 'primereact/scrollpanel'
import React from 'react'
import HeroPreview from '../features/HeroPreview'
import { Hero } from '../features/Modals/HeroModal'

interface HeroGridProps {
	heroes: Hero[]
	onHeroSelect: (hero: Hero, index: number) => void
	heroRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

const HeroGrid: React.FC<HeroGridProps> = ({
	heroes,
	heroRefs,
	onHeroSelect,
}) => {
	return (
		<div className='w-full'>
			<ScrollPanel className='w-full overflow-y-auto'>
				{heroes.map((hero, index) => (
					<div
						key={index}
						className={`${index === heroes.length - 1 ? 'pb-5' : ''}`}
					>
						<HeroPreview
							hero={hero}
							heroRefs={heroRefs}
							index={index}
							onHeroSelect={onHeroSelect}
						/>
					</div>
				))}
			</ScrollPanel>
		</div>
	)
}

export default HeroGrid
