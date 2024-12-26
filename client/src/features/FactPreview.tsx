import React from 'react'
import { Fact } from '../entities/Fact'

interface FactPreviewProps {
	fact: Fact
	onFactSelect: (fact: Fact) => void
}

const FactPreview: React.FC<FactPreviewProps> = ({ fact, onFactSelect }) => {
	return (
		<div
			className='w-full flex rounded-lg shadow-md p-4 cursor-pointer transition-transform duration-300 hover:scale-105'
			onClick={() => onFactSelect(fact)}
		>
			<div className='flex-shrink-0 w-24 h-24 flex flex-col items-center mr-4'>
				<img
					src={fact.image}
					alt={`${fact.name} image`}
					className='w-full h-full rounded-lg object-cover'
				/>
			</div>
			<div className='flex items-center'>
				<p className='text-contrastBlue text-lg font-semibold'>{fact.name}</p>
			</div>
		</div>
	)
}

export default FactPreview
