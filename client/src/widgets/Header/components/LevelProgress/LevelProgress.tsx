import React, {useEffect, useState} from 'react'
import { ProgressBar } from 'primereact/progressbar';
import basePoints, {CalculateCurrentLevel} from '../../../../shared/utils/constants'
import './LevelProgress.css';

interface LevelProgressProps {
	totalScore: number;
	onLevelUp: (currentLevel : number) => void; // Функция обратного вызова
}

const LevelProgress: React.FC<LevelProgressProps> = ({ totalScore, onLevelUp }) => {
	const [progressToUp, setProgressToUp] = useState(0)
	
	const level = CalculateCurrentLevel(totalScore) // Определяем уровень
	const pointsForNextLevel = basePoints * Math.pow(2, level); // Очки для достижения следующего уровня
	const requiredPoints = basePoints * (Math.pow(2, level) - 1); // Необходимые очки для достижения текущего уровня
	const progress = totalScore - requiredPoints; // Оставшиеся очки для достижения следующего уровня
	const percentage = (progress / pointsForNextLevel) * 100; // Процент прогресса

	useEffect(() => {
		// Определяем текущий уровень
		setProgressToUp(percentage);
	
		// Проверяем, повысился ли уровень
		if (totalScore > 0) {
			if (percentage < progressToUp && percentage == 0) {
				onLevelUp(level); // Передаем новый уровень
			}
		}
	}, [totalScore]);

	return (
		<div className='level-progress'>
			<h3 style={{ color: '#f3ba2f' }}>Ур. {level}</h3>
			<ProgressBar
				value={percentage}
				showValue={false}
				style={{
					height: '10px',
					width: '100px',
					backgroundColor: 'white',
				}}
				className='custom-progressbar'
			/>
		</div>
	)
}

export default LevelProgress
