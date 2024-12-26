import React from 'react'
import ProfileInfo from './components/ProfileInfo'

interface HeaderProps {
	nowScore: number
}

const Header: React.FC<HeaderProps> = props => {
	const { nowScore } = props

	return (
		<div className='px-4 py-4 z-10'>
			<ProfileInfo nowScore={nowScore} />
		</div>
	)
}

export default Header
