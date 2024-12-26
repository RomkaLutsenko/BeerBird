import React from 'react'
import './Loader.css'

const Loader: React.FC = () => {
	return (
		<div className='compass-wrapper'>
			<div className='compass'>
				<div className='compass-center'></div>
				<div className='compass-needle'></div>
				<div className='compass-north'>N</div>
				<div className='compass-east'>E</div>
				<div className='compass-south'>S</div>
				<div className='compass-west'>W</div>
			</div>
			<p style={{marginTop:"10px"}}>Пожалуйста, подождите...</p>
		</div>
	)
}

export default Loader
