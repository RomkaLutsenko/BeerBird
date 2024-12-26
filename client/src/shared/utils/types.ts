import { User1 } from '../../entities/User1'

export type IconProps = {
	size?: number
	className?: string
	color?: string
}
export type RuleProps = {
	iconProps?: IconProps
	onClick?: () => void
}

// ========================================
interface Shape {
	x: number
	y: number
}

export interface Circle extends Shape {
	radius: number
}

export interface Rectangle extends Shape {
	width: number
	height: number
}

export interface UserState {
	user: User1 | null
}

export interface ActionState {
	isGame: boolean
	isLoading: boolean
	isAuth: boolean
}
