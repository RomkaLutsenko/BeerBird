import React from 'react'
import ReactDOM from 'react-dom/client' // Импортируем из 'react-dom/client'
import { Provider } from 'react-redux'
import App from './app/App'
import { store } from './app/store/store'
import './index.css'

const rootElement = document.getElementById('root') as HTMLElement

const root = ReactDOM.createRoot(rootElement)

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
