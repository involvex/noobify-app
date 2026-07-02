import Voice, {
	SpeechResultsEvent,
	SpeechErrorEvent,
} from '@react-native-voice/voice'
import {useState, useCallback, useEffect, useRef} from 'react'
import {Platform, PermissionsAndroid} from 'react-native'

export type VoiceState = 'idle' | 'listening' | 'processing' | 'error'

export interface UseVoiceReturn {
	state: VoiceState
	transcript: string
	error: string | null
	isSupported: boolean
	startListening: (language?: string) => Promise<void>
	stopListening: () => Promise<void>
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
	const isListeningRef = useRef(false)

	useEffect(() => {
		const checkSupport = async () => {
			try {
				const available = await Voice.isAvailable()
				setIsSupported(available === 1)
			} catch {
				setIsSupported(false)
			}
		}
		checkSupport()

		return () => {
			Voice.destroy().then(Voice.removeAllListeners)
		}
	}, [])

	useEffect(() => {
		const onSpeechStart = () => {
			setState('listening')
		}

		const onSpeechEnd = () => {
			if (isListeningRef.current) {
				setState('processing')
				isListeningRef.current = false
			}
		}

		const onSpeechResults = (e: SpeechResultsEvent) => {
			const result = e.value?.[0] || ''
			setTranscript(result)
			setState('idle')
		}

		const onSpeechPartialResults = (e: SpeechResultsEvent) => {
			const result = e.value?.[0] || ''
			if (result) {
				setTranscript(result)
			}
		}

		const onSpeechError = (e: SpeechErrorEvent) => {
			setError(e.error?.message || 'Speech recognition failed')
			setState('error')
			isListeningRef.current = false
		}

		Voice.onSpeechStart = onSpeechStart
		Voice.onSpeechEnd = onSpeechEnd
		Voice.onSpeechResults = onSpeechResults
		Voice.onSpeechPartialResults = onSpeechPartialResults
		Voice.onSpeechError = onSpeechError

		return () => {
			Voice.removeAllListeners()
		}
	}, [])

	const requestPermission = async (): Promise<boolean> => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
					{
						title: 'Microphone Permission',
						message:
							'Noobify needs access to your microphone for speech-to-text.',
						buttonPositive: 'Allow',
						buttonNegative: 'Deny',
					},
				)
				return granted === PermissionsAndroid.RESULTS.GRANTED
			} catch {
				return false
			}
		}
		return true
	}

	const startListening = useCallback(async (language: string = 'en') => {
		try {
			setError(null)
			setTranscript('')

			const hasPermission = await requestPermission()
			if (!hasPermission) {
				setError('Microphone permission denied')
				setState('error')
				return
			}

			const langCode = LANGUAGE_MAP[language] || 'en-US'
			isListeningRef.current = true
			setState('listening')

			await Voice.start(langCode)
		} catch (err) {
			const errorMsg =
				err instanceof Error ? err.message : 'Failed to start listening'
			setError(errorMsg)
			setState('error')
			isListeningRef.current = false
		}
	}, [])

	const stopListening = useCallback(async () => {
		try {
			isListeningRef.current = false
			await Voice.stop()
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
