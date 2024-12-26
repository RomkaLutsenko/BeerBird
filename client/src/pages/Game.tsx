import { useEffect, useRef, useState } from 'react'
import { useCustomEventListener } from '../shared/hooks/useCustomEventListener'
import * as constants from '../shared/utils/constants'
import { updateCanvasSize } from '../shared/utils/constants'
import { Circle, Rectangle } from '../shared/utils/types'
import EndDialog from '../widgets/EndDialog'

// ground
let groundX = 0

// bird
const birdX = 60
let birdY = 120
let birdYSpeed = 0

// pipes
let pipeGapBottomY = constants.PIPE_HEIGHT
let pipeX = constants.CANVAS_WIDTH

// score
let score: number = 0
let bestScore: number = parseInt(localStorage.getItem('bestScore') || '0')

// check collision between circle and rectangle
const checkCollision = (circle: Circle, rect: Rectangle) => {
	if (
		circle.x + circle.radius >= rect.x &&
		circle.x - circle.radius <= rect.x + rect.width
	) {
		if (
			circle.y + circle.radius >= rect.y &&
			circle.y - circle.radius <= rect.y + rect.height
		) {
			return true
		}
	}
	return false
}

// check if bird has touched a pipe
const touchedPipe = () => {
	const birdHitbox: Circle = {
		x: birdX + constants.BIRD_WIDTH / 2,
		y: birdY + constants.BIRD_HEIGHT / 2 + 5,
		radius: 20,
	}

	const upperPipe: Rectangle = {
		x: pipeX,
		y: 0,
		width: constants.PIPE_WIDTH,
		height: pipeGapBottomY,
	}

	const lowerPipe: Rectangle = {
		x: pipeX,
		y: pipeGapBottomY + constants.PIPE_GAP,
		width: constants.PIPE_WIDTH,
		height:
			constants.CANVAS_HEIGHT -
			constants.HEIGHT_GROUND -
			(pipeGapBottomY + constants.PIPE_GAP),
	}

	return (
		checkCollision(birdHitbox, upperPipe) ||
		checkCollision(birdHitbox, lowerPipe)
	)
}

// check if bird has touched the ground
const fallOut = () =>
	birdY + constants.BIRD_HEIGHT >
	constants.CANVAS_HEIGHT - constants.HEIGHT_GROUND

// stop game
const reset = () => {
	score = 0 // Reset score
	birdY = 120 // Reset bird position
	pipeX = constants.CANVAS_WIDTH // Reset pipes
	pipeGapBottomY = constants.PIPE_HEIGHT // Reset pipe gap
	birdYSpeed = 0 // Reset bird speed
	canGetScore = true // Allow score calculation again
	hasFinished = false
}

let hasFinished = false
let canGetScore = true

interface GameProps {
	setActiveIndex: (index: number) => void
	onButtonClick: (score: number) => void
}

const Game: React.FC<GameProps> = ({ onButtonClick, setActiveIndex }) => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [hasStarted, setHasStarted] = useState<boolean>(false)
	const canvas = useRef<HTMLCanvasElement>(null)
	const drawIntervalRef = useRef<number | null>(null)

	// bird jump
	const jump = () => {
		if (hasFinished) {
			return
		}
		if (!hasStarted) {
			setHasStarted(true)
		}
		birdYSpeed = constants.JUMP_SPEED
	}

	// enable space button
	const handler = (key: KeyboardEvent) => {
		if (hasFinished) {
			return
		}
		if (key.code === 'Space') {
			jump()
		}
	}

	useCustomEventListener('keypress', handler)

	const draw = (context: CanvasRenderingContext2D) => {
		// draw background
		context.fillStyle = '#b97a57'
		context.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT)

		// draw clouds
		context.drawImage(
			constants.CLOUDS,
			constants.CLOUDS_X,
			constants.CLOUDS_Y,
			constants.CLOUDS_WIDTH,
			constants.CLOUDS_HEIGHT
		)

		// draw ground
		context.drawImage(
			constants.GROUND,
			groundX,
			constants.GROUND_Y,
			constants.GROUND_WIDTH,
			constants.GROUND_HEIGHT
		)
		context.drawImage(
			constants.GROUND,
			groundX + constants.CANVAS_WIDTH,
			constants.GROUND_Y,
			constants.GROUND_WIDTH,
			constants.GROUND_HEIGHT
		)

		// draw bird
		context.drawImage(
			constants.BIRD,
			birdX,
			birdY,
			constants.BIRD_WIDTH,
			constants.BIRD_HEIGHT
		)

		// draw pipes
		context.fillStyle = '#a6a6a6'
		context.fillRect(pipeX, 0, constants.PIPE_WIDTH, pipeGapBottomY)
		context.fillRect(
			pipeX,
			pipeGapBottomY + constants.PIPE_GAP,
			constants.PIPE_WIDTH,
			constants.CANVAS_HEIGHT -
				constants.HEIGHT_GROUND -
				(pipeGapBottomY + constants.PIPE_GAP)
		)

		// Draw current score
		context.fillStyle = 'black'
		context.font = '26px Roboto'
		context.fillText(score.toString(), constants.CANVAS_WIDTH / 2 - 15, 50)
	}

	const startGameInterval = () => {
		if (canvas.current) {
			const context = canvas.current.getContext('2d')
			if (context) {
				drawIntervalRef.current = setInterval(() => {
					// Остальная логика игры
					if (touchedPipe() || fallOut()) {
						if (score > bestScore) {
							bestScore = score
							localStorage.setItem('bestScore', score.toString())
						}
						setShowModal(true)
						hasFinished = true
						return
					}

					if (canGetScore && birdX > pipeX + constants.PIPE_WIDTH) {
						canGetScore = false
						score++
					}

					draw(context)

					if (pipeX < -constants.PIPE_WIDTH) {
						pipeX = constants.CANVAS_WIDTH
						pipeGapBottomY = constants.PIPE_GAP * Math.random()
						canGetScore = true
					}

					if (groundX <= -constants.CANVAS_WIDTH) {
						groundX = 0
					}

					pipeX -= constants.SPEED
					groundX -= constants.SPEED
					birdY += birdYSpeed * (constants.INTERVAL / 1000)
					birdYSpeed -= constants.FALL_SPEED * (constants.INTERVAL / 1000)
				}, constants.INTERVAL)
			}
		}
	}

	useEffect(() => {
		const resizeCanvas = () => {
			if (canvas.current) {
				updateCanvasSize(canvas.current)
			}
		}

		// Initial setup
		resizeCanvas()

		// Attach resize listener
		window.addEventListener('resize', resizeCanvas)

		return () => {
			// Cleanup listener
			window.removeEventListener('resize', resizeCanvas)
		}
	}, [])

	useEffect(() => {
		if (canvas.current) {
			const context = canvas.current.getContext('2d')
			if (context) {
				// Рисуем статичную сцену при монтировании
				context.fillStyle = '#b97a57'
				context.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT)

				context.drawImage(
					constants.CLOUDS,
					constants.CLOUDS_X,
					constants.CLOUDS_Y,
					constants.CLOUDS_WIDTH,
					constants.CLOUDS_HEIGHT
				)

				context.drawImage(
					constants.GROUND,
					groundX,
					constants.GROUND_Y,
					constants.GROUND_WIDTH,
					constants.GROUND_HEIGHT
				)
				context.drawImage(
					constants.GROUND,
					groundX + constants.CANVAS_WIDTH,
					constants.GROUND_Y,
					constants.GROUND_WIDTH,
					constants.GROUND_HEIGHT
				)

				context.drawImage(
					constants.BIRD,
					birdX,
					birdY,
					constants.BIRD_WIDTH,
					constants.BIRD_HEIGHT
				)
			}
		}
	}, [])

	useEffect(() => {
		if (hasStarted) {
			startGameInterval()
		}
	}, [hasStarted])

	useEffect(() => {
		if (showModal) {
			if (drawIntervalRef.current) {
				clearInterval(drawIntervalRef.current)
			}
		}
	}, [showModal])

	const handleRetry = () => {
		setShowModal(false)
		reset()
		setHasStarted(false)

		if (drawIntervalRef.current) {
			clearInterval(drawIntervalRef.current)
		}

		if (canvas.current) {
			const context = canvas.current.getContext('2d')
			if (context) {
				// Рисуем статичную сцену
				context.fillStyle = '#b97a57'
				context.fillRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT)

				context.drawImage(
					constants.CLOUDS,
					constants.CLOUDS_X,
					constants.CLOUDS_Y,
					constants.CLOUDS_WIDTH,
					constants.CLOUDS_HEIGHT
				)

				context.drawImage(
					constants.GROUND,
					groundX,
					constants.GROUND_Y,
					constants.GROUND_WIDTH,
					constants.GROUND_HEIGHT
				)
				context.drawImage(
					constants.GROUND,
					groundX + constants.CANVAS_WIDTH,
					constants.GROUND_Y,
					constants.GROUND_WIDTH,
					constants.GROUND_HEIGHT
				)

				context.drawImage(
					constants.BIRD,
					birdX,
					birdY,
					constants.BIRD_WIDTH,
					constants.BIRD_HEIGHT
				)
			}
		}
	}

	const handleMainMenu = () => {
		setShowModal(false)
		if (drawIntervalRef.current) {
			clearInterval(drawIntervalRef.current)
			drawIntervalRef.current = null
		}

		if (score !== null) {
			onButtonClick(score)
		} else {
			onButtonClick(0)
		}

		reset()
		setActiveIndex(2)
	}

	return (
		<div
			onClick={jump}
			onKeyPress={jump}
			className='absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]'
		>
			<canvas
				ref={canvas}
				className='absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]'
			/>
			<EndDialog
				showDialog={showModal}
				score={score}
				bestScore={bestScore}
				onRetry={handleRetry}
				onMainMenu={handleMainMenu}
			/>
		</div>
	)
}

export default Game
