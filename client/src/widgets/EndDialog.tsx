import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@mui/material'
import React from 'react'

interface EndDialogProps {
	showDialog: boolean
	score: number
	bestScore: number
	onRetry: () => void // новая проп для перезапуска
	onMainMenu: () => void // новая проп для возврата в главное меню
}

const buttonMenuBg = {
	fontWeight: '900',
	height: '50px',
	margin: '0 15px',
	backgroundColor: 'rgba(0, 0, 255, 0.2)',
	color: 'black',
}

const EndDialog: React.FC<EndDialogProps> = ({
	showDialog,
	score,
	bestScore,
	onRetry,
	onMainMenu,
}) => {
	return (
		<Dialog
			open={showDialog}
			disableEscapeKeyDown
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					Результат: {score} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Лучший:{' '}
					{bestScore}
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button style={buttonMenuBg} onClick={onMainMenu} color='primary'>
					В главное меню
				</Button>
				<Button style={buttonMenuBg} onClick={onRetry} color='primary'>
					Попробовать ещё
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EndDialog
