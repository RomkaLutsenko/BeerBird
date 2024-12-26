const basePoints = 100 //Базовые очки для повышения уровня

export function CalculateCurrentLevel(totalScore: number): number {
	const level = Math.floor(Math.log2(totalScore / basePoints + 1))
	return level
}

export default basePoints

// ==============================================================================================

// Исходные размеры
export const INTERVAL = 20
export const BASE_CANVAS_WIDTH = 300
export const BASE_CANVAS_HEIGHT = 450

// Переменные для масштабирования
export let CANVAS_WIDTH = BASE_CANVAS_WIDTH
export let CANVAS_HEIGHT = BASE_CANVAS_HEIGHT

// clouds
export const CLOUDS = new Image()
CLOUDS.src = './images/clouds.png'
export let CLOUDS_WIDTH = 300
export let CLOUDS_HEIGHT = 280
export let CLOUDS_X = 0
export let CLOUDS_Y = 0

// bird
export const BIRD = new Image()
BIRD.src = './images/bird.png'
export let BIRD_WIDTH = 50
export let BIRD_HEIGHT = 50

// ground
export const GROUND = new Image()
GROUND.src = './images/ground.png'
export let GROUND_HEIGHT = 200
export let GROUND_WIDTH = CANVAS_WIDTH
export let GROUND_Y = CANVAS_HEIGHT - GROUND_HEIGHT
export let HEIGHT_GROUND = 59

// pipes
export let PIPE_WIDTH = 40
export let PIPE_HEIGHT = CANVAS_HEIGHT / 2
export let PIPE_GAP = CANVAS_HEIGHT / 2 - HEIGHT_GROUND - 50

// movements
export let JUMP_SPEED = -200
export let FALL_SPEED = -800
export let SPEED = 2

// Масштабирование и обновление размеров
export function updateCanvasSize(canvasElement: HTMLCanvasElement): void {
	const container = document.getElementById('game-container') as HTMLElement
	if (!container) {
		console.warn("Container 'game-container' not found.")
		return
	}

	const containerWidth = container.offsetWidth
	const scale = containerWidth / BASE_CANVAS_WIDTH

	CANVAS_WIDTH = BASE_CANVAS_WIDTH * scale
	CANVAS_HEIGHT = BASE_CANVAS_HEIGHT * scale
	canvasElement.width = CANVAS_WIDTH
	canvasElement.height = CANVAS_HEIGHT

	CLOUDS_WIDTH = 300 * scale
	CLOUDS_HEIGHT = 280 * scale

	BIRD_WIDTH = 50 * scale
	BIRD_HEIGHT = 50 * scale

	GROUND_WIDTH = CANVAS_WIDTH
	GROUND_HEIGHT = 200 * scale
	GROUND_Y = CANVAS_HEIGHT - GROUND_HEIGHT
	HEIGHT_GROUND = 59 * scale

	PIPE_WIDTH = 40 * scale
	PIPE_HEIGHT = CANVAS_HEIGHT / 2
	PIPE_GAP = CANVAS_HEIGHT / 2 - HEIGHT_GROUND - 50 * scale

	JUMP_SPEED = -200 * scale
	FALL_SPEED = -800 * scale
	SPEED = 2 * scale
}
