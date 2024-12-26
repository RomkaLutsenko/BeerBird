import React, { useEffect, useRef, useState } from 'react'
import { UserData } from '../entities/User'
import HeroBuyModal from '../features/Modals/HeroBuyModal'
import { Hero } from '../features/Modals/HeroModal'
import { heroList } from '../shared/utils/heroes'
import HeroGrid from '../widgets/HeroGrid'

interface BoostsPageProps {
	updateBoost: (
		clickBoost: number,
		timeBoost: number,
		cost: number,
		boostItems: string
	) => Promise<boolean>
	userData: UserData
}

const BoostsPage: React.FC<BoostsPageProps> = ({ updateBoost, userData }) => {
	const [visible, setVisible] = useState<boolean>(false)
	const [hero, setHero] = useState<Hero | null>(null)
	const heroCardRefs = useRef<(HTMLDivElement | null)[]>([])
	const [heroes, setHeroes] = useState<Hero[]>(heroList)

	useEffect(() => {
		if (userData.boostItems) {
			setHeroes(JSON.parse(userData.boostItems))
		} else {
			setHeroes(heroList)
		}
	}, [])

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

	const handleBuy = async (hero: Hero) => {
		// Обновляем состояние героя в списке
		const updatedHeroes = heroes.map(h =>
			h.name === hero.name ? { ...h, isPurchased: true } : h
		)
		const heroesJSON = JSON.stringify(updatedHeroes)
		if (heroesJSON) {
			if (
				await updateBoost(
					hero.clickBoost,
					hero.timeBoost,
					hero.cost,
					heroesJSON
				)
			) {
				setHeroes(updatedHeroes)
				setVisible(false)
			}
		}
	}

	// Фильтруем только не купленных героев
	const availableHeroes = heroes.filter(hero => !hero.isPurchased)

	return (
		<div>
			<div className='w-full h-[41rem] overflow-y-auto'>
				<HeroGrid
					heroes={availableHeroes}
					onHeroSelect={showHero}
					heroRefs={heroCardRefs} // Передаем refs в HeroGrid
				/>
				{hero && (
					<HeroBuyModal
						onBuy={handleBuy}
						hero={hero}
						visible={visible}
						onHide={() => setVisible(false)}
					/>
				)}
			</div>
		</div>
	)
}

export default React.memo(BoostsPage)
