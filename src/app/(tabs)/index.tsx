import {
	Text,
	TextInput,
	Button,
	Card,
	Chip,
	ActivityIndicator,
	ProgressBar,
	Surface,
	IconButton,
} from 'react-native-paper'
import {View, StyleSheet, ScrollView, Share} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useState, useCallback, useEffect} from 'react'

import {useLocalLLM, type Language} from '@/hooks/useLocalLLM'
import {addHistoryItem} from '@/hooks/useDatabase'
import {useThemeContext} from '@/constants/themes'
import {useVoice} from '@/hooks/useVoice'

const CATEGORY_LABELS: Record<string, {en: string; de: string}> = {
	'web-dev': {en: 'Web Development', de: 'Webentwicklung'},
	programming: {en: 'Programming', de: 'Programmierung'},
	devops: {en: 'DevOps & Tools', de: 'DevOps & Werkzeuge'},
	'ai-data': {en: 'AI & Data', de: 'KI & Daten'},
}

function SkillBadge({
	category,
	language,
	colors,
}: {
	category: string | null
	language: Language
	colors: Record<string, string>
}) {
	if (!category) return null
	const labels = CATEGORY_LABELS[category] ?? {en: category, de: category}
	return (
		<View style={badgeStyles.container}>
			<View style={[badgeStyles.dot, {backgroundColor: colors.success}]} />
			<Text style={[badgeStyles.text, {color: colors.success}]}>
				{labels[language]}
			</Text>
		</View>
	)
}

const badgeStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		marginBottom: 12,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	text: {
		fontSize: 12,
		fontWeight: '500',
		textTransform: 'uppercase',
		letterSpacing: 0.08,
	},
})

function LanguageToggle({
	language,
	onToggle,
	colors,
}: {
	language: Language
	onToggle: (lang: Language) => void
	colors: Record<string, string>
}) {
	return (
		<View style={toggleStyles.container}>
			<Chip
				selected={language === 'en'}
				onPress={() => onToggle('en')}
				style={[
					toggleStyles.chip,
					{backgroundColor: colors.surface, borderColor: colors.border},
					language === 'en' && {
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					},
				]}
				textStyle={[
					toggleStyles.chipText,
					{color: colors.onSurfaceMuted},
					language === 'en' && {color: '#FFFFFF'},
				]}
				mode="flat"
			>
				🇬🇧 English
			</Chip>
			<Chip
				selected={language === 'de'}
				onPress={() => onToggle('de')}
				style={[
					toggleStyles.chip,
					{backgroundColor: colors.surface, borderColor: colors.border},
					language === 'de' && {
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					},
				]}
				textStyle={[
					toggleStyles.chipText,
					{color: colors.onSurfaceMuted},
					language === 'de' && {color: '#FFFFFF'},
				]}
				mode="flat"
			>
				🇩🇪 Deutsch
			</Chip>
		</View>
	)
}

const toggleStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 12,
		justifyContent: 'center',
	},
	chip: {
		borderWidth: 1,
	},
	chipSelected: {},
	chipText: {
		fontSize: 14,
	},
	chipTextSelected: {
		color: '#FFFFFF',
	},
})

export default function TranslatorScreen() {
	const [inputTerm, setInputTerm] = useState('')
	const [language, setLanguage] = useState<Language>('en')
	const [hasGenerated, setHasGenerated] = useState(false)
	const {colors} = useThemeContext()
	const {
		state: voiceState,
		transcript,
		error: _voiceError,
		isSupported: voiceSupported,
		startListening,
		stopListening,
		resetTranscript,
	} = useVoice()

	const {
		downloadState,
		downloadProgress,
		initState,
		generationState,
		generatedText,
		error,
		matchedTerm,
		termCategory,
		generateAnalogy,
		retryDownload,
	} = useLocalLLM()

	useEffect(() => {
		if (transcript) {
			setInputTerm(transcript)
		}
	}, [transcript])

	const handleSubmit = useCallback(async () => {
		if (!inputTerm.trim()) return

		const result = await generateAnalogy(inputTerm.trim(), language)
		if (result) {
			setHasGenerated(true)
			await addHistoryItem(
				inputTerm.trim(),
				result,
				language,
				termCategory || undefined,
			)
		}
	}, [inputTerm, language, generateAnalogy, termCategory])

	const handleShare = useCallback(async () => {
		if (!generatedText) return

		try {
			const shareContent =
				language === 'en'
					? `📝 **${inputTerm}**\n\n💡 ${generatedText}`
					: `📝 **${inputTerm}**\n\n💡 ${generatedText}`

			await Share.share({
				message: shareContent,
				title: language === 'en' ? 'Noobify Result' : 'Noobify Ergebnis',
			})
		} catch (err) {
			console.error('Share failed:', err)
		}
	}, [generatedText, inputTerm, language])
	const handleCopy = useCallback(async () => {
		if (!generatedText) return

		const copyText =
			language === 'en'
				? `${inputTerm}: ${generatedText}`
				: `${inputTerm}: ${generatedText}`

		await Share.share({
			message: copyText,
			title: language === 'en' ? 'Noobify Result' : 'Noobify Ergebnis',
		})
	}, [generatedText, inputTerm, language])
	const handleClear = useCallback(() => {
		setInputTerm('')
		setHasGenerated(false)
		resetTranscript()
	}, [resetTranscript])

	const handleVoiceToggle = useCallback(() => {
		if (voiceState === 'listening') {
			stopListening()
		} else {
			startListening(language)
		}
	}, [voiceState, language, startListening, stopListening])

	const handleReroll = useCallback(async () => {
		if (!inputTerm.trim()) return

		const result = await generateAnalogy(inputTerm.trim(), language)
		if (result) {
			setHasGenerated(true)
			await addHistoryItem(
				inputTerm.trim(),
				result,
				language,
				termCategory || undefined,
			)
		}
	}, [inputTerm, language, generateAnalogy, termCategory])

	const handleDetailed = useCallback(async () => {
		if (!inputTerm.trim()) return

		const result = await generateAnalogy(inputTerm.trim(), language, true)
		if (result) {
			setHasGenerated(true)
			await addHistoryItem(
				inputTerm.trim(),
				result,
				language,
				termCategory || undefined,
			)
		}
	}, [inputTerm, language, generateAnalogy, termCategory])

	const renderContent = () => {
		if (downloadState === 'checking' || downloadState === 'downloading') {
			return (
				<View style={styles.statusContainer}>
					<ActivityIndicator
						size="large"
						color={colors.primary}
					/>
					<Text style={[styles.statusText, {color: colors.onSurfaceMuted}]}>
						{downloadState === 'checking'
							? language === 'en'
								? 'Checking model...'
								: 'Prüfe Modell...'
							: language === 'en'
								? 'Downloading model...'
								: 'Lade Modell herunter...'}
					</Text>
					<ProgressBar
						progress={downloadProgress / 100}
						color={colors.primary}
						style={[styles.progressBar, {backgroundColor: colors.surface}]}
					/>
					<Text style={[styles.progressText, {color: colors.onSurfaceFaint}]}>
						{downloadProgress}%
					</Text>
				</View>
			)
		}

		if (downloadState === 'error') {
			return (
				<View style={styles.statusContainer}>
					<Text style={[styles.errorText, {color: colors.error}]}>{error}</Text>
					<Button
						mode="contained"
						onPress={retryDownload}
						style={styles.retryButton}
					>
						{language === 'en' ? 'Retry Download' : 'Erneut versuchen'}
					</Button>
				</View>
			)
		}

		if (initState === 'initializing') {
			return (
				<View style={styles.statusContainer}>
					<ActivityIndicator
						size="large"
						color={colors.primary}
					/>
					<Text style={[styles.statusText, {color: colors.onSurfaceMuted}]}>
						{language === 'en'
							? 'Initializing AI model...'
							: 'Initialisiere KI-Modell...'}
					</Text>
				</View>
			)
		}

		if (initState === 'error') {
			return (
				<View style={styles.statusContainer}>
					<Text style={[styles.errorText, {color: colors.error}]}>{error}</Text>
				</View>
			)
		}

		return (
			<>
				<Surface
					style={[
						styles.inputSurface,
						{backgroundColor: colors.surface, borderColor: colors.border},
					]}
				>
					<LanguageToggle
						language={language}
						onToggle={setLanguage}
						colors={colors}
					/>

					<View style={styles.inputRow}>
						<TextInput
							mode="flat"
							label={
								language === 'en'
									? 'Enter tech term...'
									: 'Fachbegriff eingeben...'
							}
							placeholder={
								language === 'en'
									? 'e.g. recursion, API, blockchain'
									: 'z.B. Rekursion, API, Blockchain'
							}
							value={inputTerm}
							onChangeText={setInputTerm}
							style={[styles.input, {backgroundColor: colors.surface, flex: 1}]}
							contentStyle={[styles.inputContent, {color: colors.onSurface}]}
							textColor={colors.onSurface}
							underlineColor={colors.border}
							activeUnderlineColor={colors.primary}
							returnKeyType="send"
							onSubmitEditing={handleSubmit}
							disabled={generationState === 'generating'}
						/>
						{voiceSupported && (
							<IconButton
								icon={
									voiceState === 'listening'
										? 'microphone'
										: 'microphone-outline'
								}
								size={28}
								iconColor={
									voiceState === 'listening' ? colors.error : colors.primary
								}
								onPress={handleVoiceToggle}
								disabled={
									generationState === 'generating' || initState !== 'ready'
								}
								style={[
									styles.voiceButton,
									voiceState === 'listening' && {
										backgroundColor: 'rgba(255, 58, 92, 0.12)',
									},
								]}
							/>
						)}
					</View>

					{voiceState === 'listening' && (
						<View style={styles.voiceIndicator}>
							<View
								style={[styles.voicePulse, {backgroundColor: colors.error}]}
							/>
							<Text style={[styles.voiceText, {color: colors.error}]}>
								{language === 'en' ? 'Listening...' : 'Höre zu...'}
							</Text>
						</View>
					)}

					<View style={styles.buttonRow}>
						{hasGenerated && (
							<Button
								mode="outlined"
								onPress={handleClear}
								style={[styles.clearButton, {borderColor: colors.border}]}
								textColor={colors.onSurfaceMuted}
							>
								{language === 'en' ? 'Clear' : 'Löschen'}
							</Button>
						)}
						<Button
							mode="contained"
							onPress={handleSubmit}
							style={styles.submitButton}
							buttonColor={colors.primary}
							loading={generationState === 'generating'}
							disabled={
								!inputTerm.trim() ||
								generationState === 'generating' ||
								initState !== 'ready'
							}
						>
							{generationState === 'generating'
								? language === 'en'
									? 'Noobifying...'
									: 'Noobifiziere...'
								: language === 'en'
									? 'Noobify ✨'
									: 'Noobifizieren ✨'}
						</Button>
					</View>
				</Surface>

				{hasGenerated && generatedText && (
					<Card
						style={[
							styles.resultCard,
							{backgroundColor: colors.surface, borderColor: colors.border},
						]}
					>
						<Card.Content>
							<SkillBadge
								category={termCategory}
								language={language}
								colors={colors}
							/>
							<Text
								style={[styles.resultLabel, {color: colors.onSurfaceMuted}]}
							>
								{language === 'en' ? 'Your analogy:' : 'Deine Analogie:'}
							</Text>
							<Text style={[styles.resultText, {color: colors.onSurface}]}>
								{generatedText}
							</Text>
							{matchedTerm && (
								<View
									style={[styles.termInfo, {borderTopColor: colors.border}]}
								>
									<Text style={[styles.termName, {color: colors.primary}]}>
										{matchedTerm.name}
									</Text>
									{matchedTerm.keyTraits.length > 0 && (
										<Text
											style={[
												styles.termTraits,
												{color: colors.onSurfaceMuted},
											]}
										>
											{language === 'en' ? 'Key traits: ' : 'Merkmale: '}
											{matchedTerm.keyTraits.join(', ')}
										</Text>
									)}
								</View>
							)}
						</Card.Content>
						<Card.Actions style={styles.cardActions}>
							<Button
								mode="text"
								onPress={handleCopy}
								icon="content-copy"
								textColor={colors.onSurfaceMuted}
							>
								{language === 'en' ? 'Copy' : 'Kopieren'}
							</Button>
							<Button
								mode="text"
								onPress={handleShare}
								icon="share"
								textColor={colors.primary}
							>
								{language === 'en' ? 'Share' : 'Teilen'}
							</Button>
							<Button
								mode="text"
								onPress={handleReroll}
								icon="refresh"
								disabled={generationState === 'generating'}
								textColor={colors.secondary}
							>
								{language === 'en' ? 'Reroll' : 'Neu generieren'}
							</Button>
							<Button
								mode="text"
								onPress={handleDetailed}
								icon="text-box-plus"
								disabled={generationState === 'generating'}
								textColor={colors.tertiary}
							>
								{language === 'en' ? 'Detailed' : 'Detailliert'}
							</Button>
						</Card.Actions>
					</Card>
				)}

				{generationState === 'error' && (
					<Card
						style={[
							styles.resultCard,
							styles.errorCard,
							{borderColor: colors.error},
						]}
					>
						<Card.Content>
							<Text style={[styles.errorCardText, {color: colors.error}]}>
								{error}
							</Text>
						</Card.Content>
					</Card>
				)}
			</>
		)
	}

	return (
		<SafeAreaView
			style={[styles.safeArea, {backgroundColor: colors.background}]}
			edges={['bottom']}
		>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.header}>
					<Text style={[styles.title, {color: colors.onSurface}]}>
						{language === 'en'
							? 'Explain it simply 💡'
							: 'Erkläre es einfach 💡'}
					</Text>
					<Text style={[styles.subtitle, {color: colors.onSurfaceMuted}]}>
						{language === 'en'
							? 'Enter any tech term and get an everyday analogy'
							: 'Gib einen beliebigen Fachbegriff ein und erhalte eine alltägliche Analogie'}
					</Text>
				</View>

				{renderContent()}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		padding: 20,
		paddingBottom: 40,
	},
	header: {
		marginBottom: 24,
		alignItems: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: '600',
		textAlign: 'center',
		letterSpacing: -0.02,
	},
	subtitle: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 8,
	},
	inputSurface: {
		borderRadius: 16,
		padding: 20,
		borderWidth: 1,
		gap: 16,
	},
	input: {
		fontSize: 16,
	},
	inputContent: {},
	buttonRow: {
		flexDirection: 'row',
		gap: 12,
		marginTop: 8,
	},
	clearButton: {
		flex: 1,
	},
	submitButton: {
		flex: 2,
	},
	resultCard: {
		marginTop: 20,
		borderWidth: 1,
		borderRadius: 16,
	},
	resultLabel: {
		fontSize: 12,
		fontWeight: '500',
		textTransform: 'uppercase',
		letterSpacing: 0.08,
		marginBottom: 8,
	},
	resultText: {
		fontSize: 16,
		lineHeight: 24,
	},
	cardActions: {
		justifyContent: 'flex-end',
		paddingTop: 8,
	},
	statusContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 60,
		gap: 16,
	},
	statusText: {
		fontSize: 16,
		textAlign: 'center',
	},
	progressBar: {
		width: '80%',
		height: 6,
		borderRadius: 3,
	},
	progressText: {
		fontSize: 14,
		fontFamily: 'monospace',
	},
	errorText: {
		fontSize: 14,
		textAlign: 'center',
		paddingHorizontal: 20,
	},
	retryButton: {
		marginTop: 8,
	},
	errorCard: {
		marginTop: 20,
	},
	errorCardText: {
		fontSize: 14,
	},
	termInfo: {
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
	},
	termName: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 4,
	},
	termTraits: {
		fontSize: 12,
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	voiceButton: {
		margin: 0,
	},
	voiceIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		paddingVertical: 8,
	},
	voicePulse: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	voiceText: {
		fontSize: 12,
		fontWeight: '500',
	},
})
