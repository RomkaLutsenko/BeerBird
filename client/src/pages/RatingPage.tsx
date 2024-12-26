import axios from 'axios'
import { Card } from 'primereact/card'
import { ScrollPanel } from 'primereact/scrollpanel'
import { useEffect, useState } from 'react'
import { UserData } from '../entities/User'
import Loader from '../widgets/Loader/Loader'

interface RaitingPageProps {
	userData: UserData
}

const RaitingPage: React.FC<RaitingPageProps> = ({ userData }) => {
	const [users, setUsers] = useState<UserData[]>([])
	const [currentId, setCurrentId] = useState<number>(-1)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('/api/users')
				if (Array.isArray(response.data)) {
					setUsers(response.data)
				} else {
					console.error('Ответ не является массивом:', response.data)
				}
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		fetchUsers()
	}, [])

	useEffect(() => {
		if (users.length > 0) {
			const curId = users.findIndex(
				user => user.telegramId === userData.telegramId
			)
			setCurrentId(curId !== -1 ? curId + 1 : -1)
		}
	}, [users, userData.telegramId])

	const renderUserCard = (user: UserData, index: number) => {
		const isCurrentUser = currentId === index + 1

		return (
			<Card
				key={user.telegramId}
				className={`w-[95%] p-4 mb-4 rounded-lg ${
					isCurrentUser ? 'bg-gold' : 'bg-gray-600'
				}`}
			>
				<div className='flex items-center w-full'>
					<p className='flex-1 text-center'>{index + 1}</p>
					<p className='flex-1 text-center'>
						{user.userName ?? user.telegramId}
					</p>
					<p className='flex-1 text-center'>{user.totalScore}</p>
				</div>
			</Card>
		)
	}

	return users.length > 0 ? (
		<div className='flex flex-col items-center w-full px-5'>
			<h2 className='mt-4'>Рейтинг игроков</h2>
			<div className='flex justify-between w-full text-center px-8 py-4'>
				<p className='flex-1'>
					<strong>Место</strong>
				</p>
				<p className='flex-1'>
					<strong>Ник</strong>
				</p>
				<p className='flex-1'>
					<strong>Очки</strong>
				</p>
			</div>
			<ScrollPanel className='w-full pb-10 h-[56vh]'>
				{users.map((user, index) => renderUserCard(user, index))}
			</ScrollPanel>
			{currentId !== -1 && renderUserCard(userData, currentId - 1)}
		</div>
	) : (
		<Loader />
	)
}

export default RaitingPage
