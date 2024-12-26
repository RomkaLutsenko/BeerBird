import React from 'react'
import { Fact } from '../../entities/Fact'
import ModalLayout from './ModalLayout'

interface FactModalProps {
	fact: Fact
	visible: boolean
	onHide: () => void
}

const FactModal: React.FC<FactModalProps> = ({ fact, visible, onHide }) => {
	return (
		<ModalLayout onHide={onHide} visible={visible}>
			<div className='text-2xl text-contrastBlue mt-2'>{fact.name}</div>
			<img
				src={fact.image}
				alt={fact.name}
				className='w-full h-auto rounded-lg mt-4'
			/>
			<div className='text-white text-left mt-4'>{fact.description}</div>
		</ModalLayout>
	)
}

export default FactModal
