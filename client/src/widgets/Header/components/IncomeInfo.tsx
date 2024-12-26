import React from 'react'
import { starCoin } from '../../../shared/assets/images'

interface IncomeInfoProps {
	nowScore: number
}

const IncomeInfo: React.FC<IncomeInfoProps> = props => {
	const { nowScore } = props
	return (
		<>
			<div className='flex items-center text-center'>
				<p className='text-md text-[#85827d]'>Баланс: </p>
				<div className='flex items-center justify-center space-x-1 ml-1'>
					<p>{nowScore}</p>
					<img src={starCoin} alt='Dollar Coin' className='w-[18px] h-[18px]' />
				</div>
			</div>
		</>
	)
}

export default IncomeInfo
