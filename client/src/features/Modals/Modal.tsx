import React from 'react'
import ModalLayout from './ModalLayout'

interface ModalProps {
	visible: boolean
	onHide: () => void
	header: string
	text: string
	buttonText: string
}

const Modal: React.FC<ModalProps> = ({
	visible,
	onHide,
	text,
	header,
	buttonText,
}) => {
	if (!visible) return null

	return (
		<ModalLayout onHide={onHide} visible={visible}>
			<div className='text-2xl text-contrastBlue mb-4'>{header}</div>
			<div className='text-white mb-4'>{text}</div>
			<button
				className='bg-contrastBlue text-gray-900 py-2 px-4 rounded transition-colors duration-300 hover:bg-blue-600'
				onClick={onHide}
			>
				{buttonText}
			</button>
		</ModalLayout>
	)
}

export default Modal
