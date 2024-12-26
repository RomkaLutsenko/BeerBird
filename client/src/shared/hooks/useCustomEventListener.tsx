import { useEffect } from 'react'

export function useCustomEventListener<T extends Event>(
	eventType: string,
	handler: (event: T) => void
) {
	useEffect(() => {
		const eventListener = (event: Event) => handler(event as T)
		window.addEventListener(eventType, eventListener)

		return () => {
			window.removeEventListener(eventType, eventListener)
		}
	}, [eventType, handler])
}
