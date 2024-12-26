import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import HeroModal, { Hero } from '../features/Modals/HeroModal'
import { mainCharacter, starCoin } from '../shared/assets/images'
import { heroList } from '../shared/utils/heroes'
import BoosterStatus from '../widgets/BoosterStatus'

interface DinoPageProps {
	score: number
	clickBoost: number
	timeBoost: number
	boostItems: string
	onButtonClick: () => void
}

interface Position {
	x: number
	y: number
}

const DinoPage: React.FC<DinoPageProps> = ({
	score,
	clickBoost,
	boostItems,
	onButtonClick,
}) => {
	const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
		[]
	)
	const [visible, setVisible] = useState<boolean>(false)
	const [hero, setHero] = useState<Hero | null>(null)
	const heroCardRefs = useRef<(HTMLDivElement | null)[]>([])
	const [positions, setPositions] = useState<Position[]>([])

	// Загрузка героев из БД
	const loadHeroes = (): Hero[] => {
		if (boostItems) {
			return JSON.parse(boostItems)
		}
		return heroList
	}

	const [heroes, setHeroes] = useState<Hero[]>(loadHeroes())

	// Отфильтровываем только купленных героев
	const purchasedHeroes = heroes.filter(hero => hero.isPurchased)

	const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = e.currentTarget
		const rect = card.getBoundingClientRect()
		// Вычисляем координаты относительно карточки
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		// Применяем эффект вращения карточки
		card.style.transform = `perspective(1000px) rotateX(${
			(-y + rect.height / 2) / 10
		}deg) rotateY(${(x - rect.width / 2) / 10}deg)`

		setTimeout(() => {
			card.style.transform = ''
		}, 100)

		setPositions(prev => [...prev, { x, y }])

		onButtonClick()
	}

	const handleAnimationEnd = (id: number) => {
		setClicks(prevClicks => prevClicks.filter(click => click.id !== id))
	}

	const showHero = (selectedHero: Hero) => {
		setHero(selectedHero)
		setVisible(true)
	}

	const hideHero = (e: MouseEvent) => {
		if (
			heroCardRefs.current.every(ref => ref && !ref.contains(e.target as Node))
		) {
			setVisible(false)
		}
	}

	useEffect(() => {
		if (visible) {
			document.addEventListener('click', hideHero)
		} else {
			document.removeEventListener('click', hideHero)
		}

		return () => {
			document.removeEventListener('click', hideHero)
		}
	}, [visible])

	return (
		<>
			<div className='px-4 mt-4 flex justify-center'>
				<div className='px-4 py-2 flex items-center space-x-2'>
					<img src={starCoin} alt='Star Coin' className='w-10 h-10' />
					<p className='text-4xl text-white'>{score.toLocaleString()}</p>
				</div>
			</div>
			<div className='px-4 mt-4 flex justify-center'>
				<div
					className='w-80 h-80 p-4 rounded-full circle-outer'
					onClick={handleCardClick}
				>
					<div className='relative w-full h-full rounded-full circle-inner'>
						<img
							src={mainCharacter}
							alt='Main Character'
							className='w-60 h-60'
						/>
						{positions.map((pos, index) => (
							<motion.div
								key={index} // Используем индекс как ключ
								initial={{ y: 0, opacity: 1 }}
								animate={{ y: -50, opacity: 0 }}
								transition={{ duration: 2 }}
								style={{
									position: 'absolute',
									left: pos.x,
									top: pos.y,
									pointerEvents: 'none',
									fontSize: '24px',
								}}
							>
								{clickBoost}
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Горизонтальный скроллбар с купленными героями */}
			<div className='w-full overflow-y-auto whitespace-nowrap mt-6'>
				<div className='flex items-center'>
					{purchasedHeroes.map((hero, index) => (
						<div
							onClick={() => showHero(hero)}
							key={hero.name}
							className='inline-block min-w-[100px] mx-5 p-2 border-2 border-contrastBlue rounded-lg bg-white/10 text-center'
							ref={el => (heroCardRefs.current[index] = el)}
						>
							<img
								src={hero.image}
								alt={hero.name}
								className='w-20 h-20 mb-2'
							/>
							<p className='text-center text-white mt-2'>
								{hero.name.split(' ')[0]}
							</p>
							<BoosterStatus
								mode='boostsPage'
								clickBoost={hero.clickBoost}
								timeBoost={hero.timeBoost}
							/>
						</div>
					))}
				</div>
			</div>
			{hero && (
				<HeroModal
					hero={hero}
					visible={visible}
					onHide={() => setVisible(false)}
				/>
			)}
			{clicks.map(click => (
				<div
					key={click.id}
					className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
					style={{
						top: `${click.y - 172}px`,
						left: `${click.x - 28}px`,
						animation: `float 1s ease-out`,
					}}
					onAnimationEnd={() => handleAnimationEnd(click.id)}
				>
					{clickBoost}
				</div>
			))}
		</>
	)
}

export default DinoPage
