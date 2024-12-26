import axios from 'axios'
import 'primeicons/primeicons.css'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import React, { useEffect, useRef, useState } from 'react'
import FactModal from '../features/Modals/FactModal'
import Modal from '../features/Modals/Modal'
import RuleModal from '../features/Modals/RuleModal'

import { factList } from '../shared/utils/facts'

import { Fact } from '../entities/Fact'
import { UserData } from '../entities/User'
import BoostsPage from '../pages/BoostsPage'
import Game from '../pages/Game'
import ProfilePage from '../pages/ProfilePage'
import RaitingPage from '../pages/RatingPage'
import Footer from '../widgets/Footer/Footer'
import Header from '../widgets/Header/Header'
import Loader from '../widgets/Loader/Loader'
import './App.css'

// Перенос Tailwind классов в объект для простоты использования
const Tailwind = {
	toast: {
		root: {
			className: classNames('w-96', 'opacity-90'),
		},
		message: {
			info: 'bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700',
			success:
				'bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700',
			warn: 'bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700',
			error:
				'bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700',
			base: 'my-4 rounded-md w-full',
		},
		content: 'flex items-center py-5 px-7',
		icon: {
			className: classNames('w-36 h-36', 'text-lg mr-2'),
		},
		text: 'text-base font-normal flex flex-col flex-1 grow shrink ml-4',
		summary: 'font-bold block',
		detail: 'mt-1 block',
		closebutton: {
			className: classNames(
				'w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out',
				'ml-auto overflow-hidden relative',
				'flex items-center justify-center',
				'hover:bg-white/30'
			),
		},
	},
}

const App: React.FC = () => {
	const [userData, setUserData] = useState<UserData | null>(null)
	const [activeIndex, setActiveIndex] = useState<number>(1)
	const [displayRuleModal, setDisplayRuleModal] = useState<boolean>(false)
	const [displayFactModal, setDisplayFactModal] = useState<boolean>(false)
	const [displayErrModal, setDisplayErrModal] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const [loadMessage, setLoadMessage] = useState<string>('Загрузка...')
	const [modalMessage, setModalMessage] = useState<string>('')
	const [headerMessage, setHeaderMessage] = useState<string>('')
	const [buttonMessage, setButtonMessage] = useState<string>('')
	const [isTimeBoost, setIsTimeBoost] = useState<boolean>(false)
	const [nowDate, setNowDate] = useState<Date>(new Date())
	const [lastActivityDate, setLastActivityDate] = useState<Date>(new Date())

	const toast = useRef<Toast>(null)

	const [facts] = useState<Fact[]>(factList)

	const [fact, setFact] = useState<Fact>({
		level: 0,
		name: '0',
		description: '',
		image: '',
	})

	// Пример использования Tailwind CSS и PrimeReact для отображения Toast
	const showToast = (
		severity: 'success' | 'error' | 'info' | 'warn',
		summary: string,
		detail: string
	) => {
		if (toast.current) {
			toast.current.show({
				severity,
				summary,
				detail,
				life: 3000,
				icon: 'none',
				contentClassName: Tailwind.toast.content,
				className: classNames(
					Tailwind.toast.message.base,
					Tailwind.toast.message[severity]
				),
			})
		}
	}

	const handleClick = (score: number): void => {
		if (userData) {
			const updatedUserData: UserData = {
				...userData,
				totalScore: Number(userData.totalScore) + score,
				nowScore: Number(userData.nowScore) + score,
			}
			setUserData(updatedUserData)
		}
	}

	const updateBoost = async (
		clickBoost: number,
		timeBoost: number,
		cost: number,
		boostItems: string
	): Promise<boolean> => {
		if (userData && userData.nowScore >= cost) {
			try {
				const response = await axios.post<UserData>('/api/boost', {
					telegramId: userData.telegramId,
					clickBoost: userData.clickBoost + clickBoost,
					timeBoost: userData.timeBoost + timeBoost,
					nowScore: userData.nowScore - cost,
					boostItems: boostItems,
				})

				setUserData(response.data)
				showToast('success', 'Успех', 'Поздравляем с покупкой!')
				return true
			} catch (error) {
				console.error('Error updating clicks:', error)
				return false
			}
		} else {
			showToast('error', 'Упс', 'У вас недостаточно DP для покупки')
			return false
		}
	}

	const closeRuleModal = (): void => {
		setDisplayRuleModal(false)
		if (activeIndex === 0) {
			setActiveIndex(1)
		}
	}

	const changeRuleModal = (): void => {
		setDisplayRuleModal(prev => !prev)
	}

	const handleLevelUp = (currentLevel: number) => {
		const currentFact = facts.find(x => x.level === currentLevel)
		if (currentFact) {
			setFact(currentFact)
			setDisplayFactModal(true)
		}
	}

	const changeFactModal = (): void => {
		setDisplayFactModal(false)
	}

	useEffect(() => {
		try {
			const queryParams = new URLSearchParams(window.location.search)
			const telegramId = Number(queryParams.get('telegramId'))
			if (telegramId) {
				const fetchUserData = async () => {
					try {
						const response = await axios.post<UserData>('/api/user', {
							telegramId,
						})
						setUserData(response.data)
					} catch (error) {
						console.error('Error fetching user data:', error)
					}
				}

				fetchUserData()
			}
		} catch (e) {
			setLoadMessage('Не удалось получить ваш Telegram Id')
		}
	}, [])

	useEffect(() => {
		if (userData) {
			if (!isTimeBoost && userData.timeBoost > 0) {
				setLastActivityDate(new Date(userData.lastActivity))
				setIsTimeBoost(true)
			}
			if (loading) {
				if (Number(userData.totalScore) === 0) {
					setDisplayRuleModal(true)
				}
				setTimeout(() => {
					setLoading(false)
				}, 1000)
			}
		}
	}, [userData, loading])

	useEffect(() => {
		if (!loading) {
			const fetchCurrentDate = async () => {
				try {
					const response = await axios.get<{ currentDate: string }>(
						'/api/current-date'
					)
					setNowDate(new Date(response.data.currentDate))
				} catch (error) {
					console.error('Ошибка при получении текущей даты:', error)
				}
			}
			fetchCurrentDate()
		}

		const query = async (
			prevUserData: UserData | null
		): Promise<UserData | null> => {
			if (!prevUserData) return null

			try {
				const response = await axios.post<UserData>('/api/updateScore', {
					telegramId: prevUserData.telegramId,
					nowScore: prevUserData.nowScore,
					totalScore: prevUserData.totalScore,
				})
				return response.data
			} catch (error) {
				console.error('Error updating:', error)
				return prevUserData
			}
		}

		const interval = setInterval(async () => {
			setUserData(prevUserData => {
				if (prevUserData) {
					query(prevUserData).then(updatedUserData => {
						setUserData(updatedUserData)
					})
				}
				return prevUserData
			})
		}, 5010)

		return () => clearInterval(interval)
	}, [loading])

	useEffect(() => {
		const calcPoints = async (): Promise<void> => {
			if (lastActivityDate < nowDate) {
				const differenceInSeconds = Math.floor(
					(nowDate.getTime() - lastActivityDate.getTime()) / 1000
				)
				const pointsToAdd = differenceInSeconds * (userData?.timeBoost ?? 0)
				try {
					const response = await axios.post<UserData>('/api/add', {
						telegramId: userData?.telegramId,
						pointsToAdd: pointsToAdd,
					})

					setUserData(response.data)
					setHeaderMessage('С возвращением!')
					setModalMessage(
						`За время вашего отсутствия вы накопили: ${pointsToAdd} DP!`
					)
					setButtonMessage('Здорово!')
					if (pointsToAdd > 0) setDisplayErrModal(true)
				} catch (error) {
					console.error('Error updating clicks:', error)
				}
			}
		}

		if (userData) {
			calcPoints()
		}
	}, [lastActivityDate])

	useEffect(() => {
		if (isTimeBoost) {
			const interval = setInterval(() => {
				if (userData) {
					setUserData(prevData => {
						if (!prevData) return prevData
						return {
							...prevData!,
							totalScore: Number(prevData.totalScore) + prevData.timeBoost,
							nowScore: Number(prevData.nowScore) + prevData.timeBoost,
						}
					})
				}
			}, 1000)

			return () => clearInterval(interval)
		}
	}, [isTimeBoost])

	return (
		<div className='bg-black flex justify-center'>
			<div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl'>
				<Toast
					ref={toast}
					position='top-center'
					className={Tailwind.toast.root.className}
				/>
				<Header nowScore={userData?.nowScore ?? 0} />
				<div className='flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0'>
					<div
						className='absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]'
						id='game-container'
					>
						{!loading ? (
							<>
								<RuleModal
									visible={displayRuleModal}
									onHide={closeRuleModal}
								></RuleModal>
								<FactModal
									fact={fact}
									visible={displayFactModal}
									onHide={changeFactModal}
								></FactModal>
								<Modal
									visible={displayErrModal}
									onHide={() => setDisplayErrModal(false)}
									text={modalMessage}
									header={headerMessage}
									buttonText={buttonMessage}
								></Modal>
								{activeIndex === 1 && (
									<div style={{ position: 'relative' }}>
										<Game
											setActiveIndex={setActiveIndex}
											onButtonClick={handleClick}
										/>
									</div>
								)}
								{activeIndex === 2 &&
									(userData ? (
										<BoostsPage userData={userData} updateBoost={updateBoost} />
									) : (
										<Loader />
									))}
								{activeIndex === 3 &&
									(userData ? <RaitingPage userData={userData} /> : <Loader />)}
								{activeIndex === 4 &&
									(userData ? <ProfilePage userData={userData} /> : <Loader />)}
							</>
						) : (
							<>
								<Loader />
								<div>{loadMessage}</div>
							</>
						)}
					</div>
				</div>
				<Footer setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
			</div>
		</div>
	)
}

export default App
