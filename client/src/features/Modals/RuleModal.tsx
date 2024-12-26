import React from 'react'
import ModalLayout from './ModalLayout'

interface RuleModalProps {
	visible: boolean
	onHide: () => void
}

const RuleModal: React.FC<RuleModalProps> = ({ visible, onHide }) => {
	return (
		<ModalLayout onHide={onHide} visible={visible}>
			<div className='text-2xl text-contrastBlue mb-4'>Правила игры</div>
			<div className='text-white text-left mb-4 space-y-4'>
				<p>Привет, друг! Добро пожаловать в beer bird!</p>
				<p>
					Задача игры очень проста. Получить как можно больше положительных
					эмоций!
				</p>
				<p>
					Их можно получить 2 способами:
					<br />- Кастомизировать эффекты, птичку, облака, землю.
					<br />- Открывать новые локации и занимать лидирующие позиции в
					ежемесячном рейтинге, чтобы получать больше жидкого золота!
				</p>
				<p>
					Каждое пройденное препятствие приблизит тебя к желаемому (халявному)
					тёмному нефильтрованному ;)
				</p>
				<p>Не буду томить, с вкладками сам разберёшься, погнали?!)</p>
			</div>
			<button
				className='bg-contrastBlue text-gray-900 py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-blue-600'
				onClick={onHide}
			>
				Погнали!
			</button>
		</ModalLayout>
	)
}

export default RuleModal
