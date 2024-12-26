import React, { useEffect, useState } from 'react'
import { Fact } from '../entities/Fact'
import { UserData } from '../entities/User'
import FactModal from '../features/Modals/FactModal'
import basePoints, { CalculateCurrentLevel } from '../shared/utils/constants'
import { factList } from '../shared/utils/facts'
import FactGrid from '../widgets/FactGrid'

interface ProfilePageProps {
	userData: UserData
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userData }) => {
	const [visible, setVisible] = useState<boolean>(false)
	const [fact, setFact] = useState<Fact | null>(null)
	const [facts, setFacts] = useState<Fact[]>(factList)

	const showFact = (selectedFact: Fact) => {
		setFact(selectedFact)
		setVisible(true)
	}

	function calculateCurrentLevel(totalScore: number) {
		if (totalScore < basePoints) {
			return 0
		}
		const level = CalculateCurrentLevel(totalScore)
		return level
	}

	// Форматируем lastActivity в формат часы:минуты
	const formatLastActivity = (lastActivity: string): string => {
		const date = new Date(lastActivity)
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}

	useEffect(() => {
		if (userData) {
			const level = calculateCurrentLevel(userData.totalScore)
			setFacts(prev => prev.filter(x => x.level <= level))
		}
	}, [userData])

	return (
		<div className='max-w-full mx-auto p-4 rounded-lg'>
			<h2 className='text-center text-xl font-semibold'>
				Профиль пользователя
			</h2>
			<div className='grid grid-cols-2 gap-4 mt-4'>
				<div className='flex justify-between items-center bg-white shadow-md rounded-lg p-3'>
					<label className='font-semibold text-gray-700'>Имя:</label>
					<p className='text-gray-500'>{userData.userName}</p>
				</div>
				<div className='flex justify-between items-center bg-white shadow-md rounded-lg p-3'>
					<label className='font-semibold text-gray-700'>Баланс:</label>
					<p className='text-gray-500'>{userData.nowScore}</p>
				</div>
				<div className='flex justify-between items-center bg-white shadow-md rounded-lg p-3'>
					<label className='font-semibold text-gray-700'>
						Всего заработано:
					</label>
					<p className='flex text-gray-500'>{userData.totalScore}</p>
				</div>
				<div className='flex justify-between items-center bg-white shadow-md rounded-lg p-3'>
					<label className='font-semibold text-gray-700'>Доход за клик: </label>
					<p className='text-gray-500'>{userData.clickBoost}</p>
				</div>
				<div className='flex justify-between items-center bg-white shadow-md rounded-lg p-3'>
					<label className='font-semibold text-gray-700'>
						Доход в секунду:
					</label>
					<p className='text-gray-500'>{userData.timeBoost}</p>
				</div>
				<div className='flex justify-between items-center bg-white shadow-md rounded-lg p-3'>
					<label className='font-semibold text-gray-700'>
						Последняя активность:
					</label>
					<p className='text-gray-500'>
						{formatLastActivity(userData.lastActivity)}
					</p>
				</div>
			</div>
			<h2 className='my-4 text-center text-xl font-semibold'>
				Коллекция интересных фактов
			</h2>
			<div className='w-full h-80 overflow-y-auto'>
				<FactGrid facts={facts} onFactSelect={showFact} />
				{fact && (
					<FactModal
						fact={fact}
						visible={visible}
						onHide={() => setVisible(false)}
					/>
				)}
			</div>
		</div>
	)
}

export default ProfilePage
