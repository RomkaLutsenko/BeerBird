import { ScrollPanel } from 'primereact/scrollpanel'
import React from 'react'
import { Fact } from '../entities/Fact'
import FactPreview from '../features/FactPreview'

interface FactGridProps {
	facts: Fact[]
	onFactSelect: (fact: Fact) => void
}

const FactGrid: React.FC<FactGridProps> = ({ facts, onFactSelect }) => {
	return (
		<div className='w-full'>
			<ScrollPanel className='w-full overflow-y-auto'>
				{facts.map((fact, index) => (
					<div
						key={index}
						className={`${index === facts.length - 1 ? 'pb-5' : ''}`}
					>
						<FactPreview fact={fact} onFactSelect={onFactSelect} />
					</div>
				))}
			</ScrollPanel>
		</div>
	)
}

export default FactGrid
