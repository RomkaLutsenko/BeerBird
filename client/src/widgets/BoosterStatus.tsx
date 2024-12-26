import React from 'react'

interface BoosterStatusProps {
	clickBoost: number
	timeBoost: number
	mode?: 'dinosaurPage' | 'boostsPage'
}

const BoosterStatus: React.FC<BoosterStatusProps> = ({
	clickBoost,
	timeBoost,
	mode = 'dinosaurPage',
}) => {
	// Убедимся, что mode принимает только разрешенные значения
	if (mode !== 'dinosaurPage' && mode !== 'boostsPage') {
		mode = 'dinosaurPage'
	}

	if (mode === 'dinosaurPage') {
		return (
			<div className='boostsContainer'>
				<span className='booster'>
					<i className='boostIcon pi pi-send'></i> {clickBoost} DP/клик
				</span>
				<span className='separator'> | </span>
				<span className='booster'>
					<i className='boostIcon pi pi-clock'></i> {timeBoost} DP/сек.
				</span>
			</div>
		)
	} else if (mode === 'boostsPage') {
		return (
			<div
				style={{ marginTop: '0', fontSize: '14px' }}
				className='boostsContainer'
			>
				{clickBoost !== 0 && (
					<span style={{ margin: '0 0px' }} className='booster'>
						<i className='boostIcon pi pi-send'></i> +{clickBoost}
					</span>
				)}
				{clickBoost !== 0 && timeBoost !== 0 && (
					<span className='separator'> | </span>
				)}
				{timeBoost !== 0 && (
					<span style={{ margin: '5px 0px' }} className='booster'>
						<i className='boostIcon pi pi-clock'></i> +{timeBoost}
					</span>
				)}
			</div>
		)
	} else {
		return null // Предохранитель на случай, если mode не 'dinosaurPage' или 'boostsPage'
	}
}

export default BoosterStatus
