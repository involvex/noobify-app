import {
	ExpoSpeechRecognitionModule,
	useSpeechRecognitionEvent,
} from 'expo-speech-recognition'
import {useState, useCallback, useEffect} from 'react'

export type VoiceState = 'idle' | 'listening' | 'processing' | 'error'

export interface UseVoiceReturn {
	state: VoiceState
	transcript: string
	error: string | null
	isSupported: boolean
	startListening: (language?: string) => Promise<void>
	stopListening: () => void
	resetTranscript: () => void
}

const LANGUAGE_MAP: Record<string, string> = {
	en: 'en-US',
	de: 'de-DE',
	es: 'es-ES',
	fr: 'fr-FR',
}

export function useVoice(): UseVoiceReturn {
	const [state, setState] = useState<VoiceState>('idle')
	const [transcript, setTranscript] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isSupported, setIsSupported] = useState(true)

	useEffect(() => {
		const checkSupport = async () => {
			try {
				const available =
					await ExpoSpeechRecognitionModule.isRecognitionAvailable()
				setIsSupported(available)
			} catch {
				setIsSupported(false)
			}
		}
		checkSupport()
	}, [])

	useSpeechRecognitionEvent('start', () => setState('listening'))

	useSpeechRecognitionEvent('end', () => setState('idle'))

	useSpeechRecognitionEvent('result', event => {
		const result = event.results[0]?.transcript || ''
		if (result) {
			setTranscript(result)
		}
		if (event.isFinal) {
			setState('idle')
		}
	})

	useSpeechRecognitionEvent('error', event => {
		setError(event.message || 'Speech recognition failed')
		setState('error')
	})

	const startListening = useCallback(async (language: string = 'en') => {
		try {
			setError(null)
			setTranscript('')

			const permResult =
				await ExpoSpeechRecognitionModule.requestPermissionsAsync()
			if (!permResult.granted) {
				setError('Microphone permission denied')
				setState('error')
				return
			}

			const langCode = LANGUAGE_MAP[language] || 'en-US'
			setState('listening')

			ExpoSpeechRecognitionModule.start({
				lang: langCode,
				interimResults: true,
				continuous: false,
			})
		} catch (err) {
			const errorMsg =
				err instanceof Error ? err.message : 'Failed to start listening'
			setError(errorMsg)
			setState('error')
		}
	}, [])

	const stopListening = useCallback(() => {
		try {
			ExpoSpeechRecognitionModule.stop()
			setState('idle')
		} catch (err) {
			const errorMsg =
				err instanceof Error ? err.message : 'Failed to stop listening'
			setError(errorMsg)
			setState('error')
		}
	}, [])

	const resetTranscript = useCallback(() => {
		setTranscript('')
		setError(null)
	}, [])

	return {
		state,
		transcript,
		error,
		isSupported,
		startListening,
		stopListening,
		resetTranscript,
	}
}
