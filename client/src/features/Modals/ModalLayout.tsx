import React from 'react'

interface ModalLayoutProps {
	visible: boolean
	onHide: () => void
	children: React.ReactNode
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
	visible,
	onHide,
	children,
}) => {
	if (!visible) return null

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'
			onClick={onHide}
		>
			<div
				className='relative bg-gray-800 p-6 rounded-lg max-w-sm w-full max-h-[80%] text-center overflow-y-auto'
				onClick={e => e.stopPropagation()}
			>
				<button
					onClick={onHide}
					className='absolute top-1 right-1 px-3 text-4xl font-light text-gray-400 hover:text-white focus:outline-none'
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	)
}

export default ModalLayout
