export type Data = {
	label: string
	value: string
}[]

export interface User1 {
	name: string
	id: string
	money: number
	bonusFlag: boolean
	data: Data
}
