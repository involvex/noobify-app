import {useState, useCallback, useEffect, useRef} from 'react'
import {initLlama, type LlamaContext} from 'llama.rn'
import {Paths, File} from 'expo-file-system'

import {
	findTerm,
	generateContext,
	buildMergedIndex,
	getTermCategory,
} from '@/skills/_index'
import type {TermDefinition} from '@/skills/types'

const MODEL_FILE_NAME = 'qwen2.5-0.5b-instruct-q4_k_m.gguf'
const MODEL_URL =
	'https://huggingface.co/bartowski/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/Qwen2.5-0.5B-Instruct-Q4_K_M.gguf'

const EN_BASE_SYSTEM_PROMPT =
	'You explain tech terms to beginners. Rules: 1) Stay strictly on the technical topic. 2) Do not describe words in the name literally. 3) Use one clear everyday analogy. 4) Write 2-4 plain sentences. 5) No markdown, no emojis, no bullet points, no special symbols. 6) Be factual, not creative.'

const EN_DETAILED_SYSTEM_PROMPT =
	'You explain tech terms to beginners. Rules: 1) Stay strictly on the technical topic. 2) Do not describe words in the name literally. 3) Use one clear everyday analogy. 4) Write 4-6 plain sentences covering what it is, how it works, and one real example. 5) No markdown, no emojis, no bullet points, no special symbols. 6) Be factual, not creative.'

const DE_BASE_SYSTEM_PROMPT =
	'Du erklärst technische Begriffe Anfängern. Regeln: 1) Bleib strikt beim technischen Thema. 2) Beschreibe nicht die Wörter im Namen wörtlich. 3) Nutze eine klare Alltagsanalogie. 4) Schreibe 2-4 einfache Sätze. 5) Kein Markdown, keine Emojis, keine Aufzählungszeichen. 6) Sei sachlich, nicht kreativ.'

const DE_DETAILED_SYSTEM_PROMPT =
	'Du erklärst technische Begriffe Anfängern. Regeln: 1) Bleib strikt beim technischen Thema. 2) Beschreibe nicht die Wörter im Namen wörtlich. 3) Nutze eine klare Alltagsanalogie. 4) Schreibe 4-6 einfache Sätze über was es ist, wie es funktioniert, und ein reales Beispiel. 5) Kein Markdown, keine Emojis, keine Aufzählungszeichen. 6) Sei sachlich, nicht kreativ.'

export type Language = 'en' | 'de'
export type DownloadState =
	'idle' | 'checking' | 'downloading' | 'ready' | 'error'
export type GenerationState = 'idle' | 'generating' | 'done' | 'error'

export interface LLMState {
	downloadState: DownloadState
	downloadProgress: number
	initState: 'idle' | 'initializing' | 'ready' | 'error'
	generationState: GenerationState
	generatedText: string
	error: string | null
	matchedTerm: TermDefinition | null
	termCategory: string | null
}

const initialState: LLMState = {
	downloadState: 'idle',
	downloadProgress: 0,
	initState: 'idle',
	generationState: 'idle',
	generatedText: '',
	error: null,
	matchedTerm: null,
	termCategory: null,
}

let _llamaContext: LlamaContext | null = null

function getModelFile(): File {
	return new File(Paths.document, MODEL_FILE_NAME)
}

function getModelPath(): string {
	return getModelFile().uri
}

async function buildEnhancedPrompt(
	term: string,
	language: Language,
	detailed: boolean = false,
): Promise<{
	systemPrompt: string
	userPrompt: string
	matchedTerm: TermDefinition | null
	category: string | null
}> {
	const index = await buildMergedIndex()
	const matchedTerm = findTerm(term, index)
	const category = matchedTerm ? getTermCategory(term, index) : null

	if (!matchedTerm) {
		const baseSystem = detailed
			? language === 'en'
				? EN_DETAILED_SYSTEM_PROMPT
				: DE_DETAILED_SYSTEM_PROMPT
			: language === 'en'
				? EN_BASE_SYSTEM_PROMPT
				: DE_BASE_SYSTEM_PROMPT
		const userPrompt = detailed
			? language === 'en'
				? `What is ${term}? Explain it simply.`
				: `Was ist ${term}? Erkläre es einfach.`
			: language === 'en'
				? `What is ${term}? Explain it simply.`
				: `Was ist ${term}? Erkläre es einfach.`

		return {
			systemPrompt: baseSystem,
			userPrompt,
			matchedTerm: null,
			category: null,
		}
	}

	const context = generateContext(matchedTerm, language)

	let systemPrompt: string
	if (language === 'en') {
		systemPrompt = [
			detailed ? EN_DETAILED_SYSTEM_PROMPT : EN_BASE_SYSTEM_PROMPT,
			'',
			'Context about this term (use for accuracy, do not copy):',
			'',
			context,
		].join('\n')
	} else {
		systemPrompt = [
			detailed ? DE_DETAILED_SYSTEM_PROMPT : DE_BASE_SYSTEM_PROMPT,
			'',
			'Kontext über diesen Begriff (zur Genauigkeit verwenden, nicht kopieren):',
			'',
			context,
		].join('\n')
	}

	const userPrompt = detailed
		? language === 'en'
			? `What is ${matchedTerm.name}? Explain it simply.`
			: `Was ist ${matchedTerm.name}? Erkläre es einfach.`
		: language === 'en'
			? `What is ${matchedTerm.name}? Explain it simply.`
			: `Was ist ${matchedTerm.name}? Erkläre es einfach.`

	return {systemPrompt, userPrompt, matchedTerm, category}
}

export function useLocalLLM() {
	const [state, setState] = useState<LLMState>(initialState)
	const contextRef = useRef<LlamaContext | null>(null)

	const checkAndDownloadModel = useCallback(async () => {
		setState(s => ({...s, downloadState: 'checking', error: null}))

		try {
			const modelFile = getModelFile()

			const fileInfo = await modelFile.info()
			if (fileInfo.exists) {
				setState(s => ({
					...s,
					downloadState: 'ready',
					downloadProgress: 100,
				}))
				return true
			}

			setState(s => ({
				...s,
				downloadState: 'downloading',
				downloadProgress: 0,
			}))

			await File.downloadFileAsync(MODEL_URL, modelFile)

			setState(s => ({
				...s,
				downloadState: 'ready',
				downloadProgress: 100,
			}))
			return true
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error'
			setState(s => ({
				...s,
				downloadState: 'error',
				error: `Model download failed: ${errorMessage}`,
			}))
			return false
		}
	}, [])

	const initializeLlama = useCallback(async () => {
		setState(s => ({...s, initState: 'initializing', error: null}))

		try {
			const context = await initLlama({
				model: getModelPath(),
				n_ctx: 1024,
				n_gpu_layers: 0,
				use_mlock: true,
			})

			_llamaContext = context
			contextRef.current = context
			setState(s => ({...s, initState: 'ready'}))
			return context
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error'
			setState(s => ({
				...s,
				initState: 'error',
				error: `LLM init failed: ${errorMessage}`,
			}))
			return null
		}
	}, [])

	const generateAnalogy = useCallback(
		async (term: string, language: Language, detailed: boolean = false) => {
			if (!contextRef.current) {
				const context = await initializeLlama()
				if (!context) return
			}

			setState(s => ({
				...s,
				generationState: 'generating',
				generatedText: '',
				error: null,
				matchedTerm: null,
				termCategory: null,
			}))

			try {
				const {systemPrompt, userPrompt, matchedTerm, category} =
					await buildEnhancedPrompt(term, language, detailed)

				const stopWords = [
					'</s>',
					'<|end|>',
					'<|eot_id|>',
					'<|end_of_text|>',
					'<|im_end|>',
					'<|EOT|>',
					'<|END_OF_TURN_TOKEN|>',
					'<|end_of_turn|>',
					'<|endoftext|>',
					'\n\n',
				]

				let fullText = ''

				await contextRef.current!.completion(
					{
						messages: [
							{role: 'system', content: systemPrompt},
							{role: 'user', content: userPrompt},
						],
						n_predict: detailed ? 512 : 256,
						stop: stopWords,
						temperature: 0.5,
					},
					data => {
						fullText += data.token
						setState(s => ({...s, generatedText: fullText}))
					},
				)

				setState(s => ({
					...s,
					generationState: 'done',
					matchedTerm,
					termCategory: category,
				}))
				return fullText
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : 'Unknown error'
				setState(s => ({
					...s,
					generationState: 'error',
					error: `Generation failed: ${errorMessage}`,
				}))
				return null
			}
		},
		[initializeLlama],
	)

	useEffect(() => {
		let mounted = true

		const init = async () => {
			const modelReady = await checkAndDownloadModel()
			if (modelReady && mounted) {
				await initializeLlama()
			}
		}

		init()

		return () => {
			mounted = false
		}
	}, [checkAndDownloadModel, initializeLlama])

	return {
		...state,
		modelPath: getModelPath(),
		generateAnalogy,
		retryDownload: checkAndDownloadModel,
	}
}
