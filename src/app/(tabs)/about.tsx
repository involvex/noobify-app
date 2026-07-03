import {
	getProfile,
	updateProfileField,
	toggleProfileField,
	addProfileField,
	deleteProfileField,
	buildProfileContext,
	exportProfile,
	importProfile,
	type ProfileField,
} from '@/hooks/useDatabase'
import {
	Text,
	TextInput,
	Button,
	Card,
	Switch,
	IconButton,
	Portal,
	Dialog,
} from 'react-native-paper'
import {SafeAreaView} from 'react-native-safe-area-context'
import {View, StyleSheet, ScrollView} from 'react-native'
import {useState, useEffect, useCallback} from 'react'
import {useThemeContext} from '@/constants/themes'

export default function AboutScreen() {
	const {colors} = useThemeContext()
	const [fields, setFields] = useState<ProfileField[]>([])
	const [preview, setPreview] = useState('')
	const [showPreview, setShowPreview] = useState(false)
	const [showAddDialog, setShowAddDialog] = useState(false)
	const [newFieldKey, setNewFieldKey] = useState('')
	const [newFieldLabel, setNewFieldLabel] = useState('')
	const [newFieldValue, setNewFieldValue] = useState('')
	const [language, setLanguage] = useState<'en' | 'de'>('en')

	const loadProfile = useCallback(async () => {
		const data = await getProfile()
		setFields(data)
	}, [])

	useEffect(() => {
		loadProfile()
	}, [loadProfile])

	const handleUpdateValue = useCallback(
		async (fieldKey: string, value: string) => {
			setFields(prev =>
				prev.map(f =>
					f.field_key === fieldKey ? {...f, field_value: value} : f,
				),
			)
			await updateProfileField(fieldKey, value)
		},
		[],
	)

	const handleToggle = useCallback(
		async (fieldKey: string, enabled: boolean) => {
			setFields(prev =>
				prev.map(f =>
					f.field_key === fieldKey ? {...f, enabled: enabled ? 1 : 0} : f,
				),
			)
			await toggleProfileField(fieldKey, enabled)
		},
		[],
	)

	const handleAddField = useCallback(async () => {
		if (!newFieldKey.trim() || !newFieldLabel.trim()) return
		const safeKey = newFieldKey.trim().toLowerCase().replace(/\s+/g, '_')
		await addProfileField(safeKey, newFieldLabel.trim(), newFieldValue.trim())
		setNewFieldKey('')
		setNewFieldLabel('')
		setNewFieldValue('')
		setShowAddDialog(false)
		await loadProfile()
	}, [newFieldKey, newFieldLabel, newFieldValue, loadProfile])

	const handleDeleteField = useCallback(
		async (fieldKey: string) => {
			await deleteProfileField(fieldKey)
			await loadProfile()
		},
		[loadProfile],
	)

	const handlePreview = useCallback(async () => {
		const ctx = await buildProfileContext()
		setPreview(
			ctx ||
				'No profile data set. Add some info above to see how the AI will know you.',
		)
		setShowPreview(true)
	}, [])

	const handleExport = useCallback(async () => {
		const data = await exportProfile()
		const json = JSON.stringify(data, null, 2)
		const {Share} = await import('react-native')
		await Share.share({
			message: json,
			title: 'Noobify Profile Export',
		})
	}, [])

	const handleImport = useCallback(async () => {
		const {Share} = await import('react-native')
		const result = await Share.share({
			message: 'Paste your profile JSON in the app and send it to import.',
			title: 'Noobify Profile Import',
		})
		if (result.action === 'sharedAction' && result.activityType) {
			// On Android, import via clipboard would be needed
			// For now, show instructions
		}
	}, [])

	const renderField = (field: ProfileField) => {
		const isDefault = [
			'name',
			'github',
			'projects',
			'tech_stack',
			'bio',
		].includes(field.field_key)

		return (
			<Card
				key={field.field_key}
				style={[
					styles.fieldCard,
					{backgroundColor: colors.surface, borderColor: colors.border},
				]}
			>
				<Card.Content style={styles.fieldContent}>
					<View style={styles.fieldHeader}>
						<View style={styles.fieldHeaderLeft}>
							<Switch
								value={field.enabled === 1}
								onValueChange={val => handleToggle(field.field_key, val)}
								color={colors.primary}
							/>
							<Text
								style={[styles.fieldLabel, {color: colors.onSurface}]}
								numberOfLines={1}
							>
								{field.field_label}
							</Text>
						</View>
						{!isDefault && (
							<IconButton
								icon="delete-outline"
								size={20}
								iconColor={colors.onSurfaceMuted}
								onPress={() => handleDeleteField(field.field_key)}
							/>
						)}
					</View>
					<TextInput
						mode="outlined"
						placeholder={
							field.field_key === 'name'
								? 'e.g. involvex'
								: field.field_key === 'github'
									? 'e.g. github.com/involvex'
									: field.field_key === 'projects'
										? 'e.g. Awesome Github App, Youtube-Music-Cli'
										: field.field_key === 'tech_stack'
											? 'e.g. Bun, React Native, TypeScript, Python'
											: field.field_key === 'bio'
												? 'e.g. Full-stack dev building local-first apps'
												: 'Add your info...'
						}
						value={field.field_value}
						onChangeText={val => handleUpdateValue(field.field_key, val)}
						style={styles.fieldInput}
						contentStyle={[styles.fieldInputContent, {color: colors.onSurface}]}
						textColor={colors.onSurface}
						underlineColor={colors.border}
						activeUnderlineColor={colors.primary}
						dense
						multiline
					/>
				</Card.Content>
			</Card>
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
						{language === 'en' ? 'About Me' : 'Über Mich'}
					</Text>
					<Text style={[styles.subtitle, {color: colors.onSurfaceMuted}]}>
						{language === 'en'
							? 'Tell the AI about yourself. This context is included in every explanation.'
							: 'Erzähl der KI von dir. Dieser Kontext wird in jeder Erklärung mit einbezogen.'}
					</Text>
				</View>

				<View style={styles.languageToggle}>
					<Button
						mode={language === 'en' ? 'contained' : 'outlined'}
						onPress={() => setLanguage('en')}
						style={styles.langButton}
						buttonColor={colors.primary}
						textColor={language === 'en' ? '#FFF' : colors.onSurfaceMuted}
					>
						English
					</Button>
					<Button
						mode={language === 'de' ? 'contained' : 'outlined'}
						onPress={() => setLanguage('de')}
						style={styles.langButton}
						buttonColor={colors.primary}
						textColor={language === 'de' ? '#FFF' : colors.onSurfaceMuted}
					>
						Deutsch
					</Button>
				</View>

				{fields.map(field => renderField(field))}

				<Button
					mode="outlined"
					onPress={() => setShowAddDialog(true)}
					icon="plus"
					style={[styles.addButton, {borderColor: colors.border}]}
					textColor={colors.primary}
				>
					{language === 'en' ? 'Add Custom Field' : 'Feld hinzufügen'}
				</Button>

				<View style={styles.actionRow}>
					<Button
						mode="contained"
						onPress={handlePreview}
						icon="eye"
						style={styles.actionButton}
						buttonColor={colors.primary}
					>
						{language === 'en' ? 'Preview Context' : 'Kontext-Vorschau'}
					</Button>
					<Button
						mode="outlined"
						onPress={handleExport}
						icon="export"
						style={styles.actionButton}
						textColor={colors.onSurfaceMuted}
					>
						{language === 'en' ? 'Export' : 'Exportieren'}
					</Button>
				</View>

				<View
					style={[
						styles.infoBox,
						{backgroundColor: colors.surface, borderColor: colors.border},
					]}
				>
					<Text style={[styles.infoTitle, {color: colors.primary}]}>
						{language === 'en' ? 'How it works' : 'So funktioniert es'}
					</Text>
					<Text style={[styles.infoText, {color: colors.onSurfaceMuted}]}>
						{language === 'en'
							? 'Enabled fields are sent to the AI model with every explanation. The model uses this context to personalize its analogies and references. All data stays on your device.'
							: 'Aktivierte Felder werden bei jeder Erklärung an das KI-Modell gesendet. Das Modell nutzt diesen Kontext, um Analogien zu personalisieren. Alle Daten bleiben auf deinem Gerät.'}
					</Text>
				</View>
			</ScrollView>

			<Portal>
				<Dialog
					visible={showPreview}
					onDismiss={() => setShowPreview(false)}
					style={{backgroundColor: colors.surface}}
				>
					<Dialog.Title style={{color: colors.onSurface}}>
						{language === 'en' ? 'AI Context Preview' : 'KI-Kontext-Vorschau'}
					</Dialog.Title>
					<Dialog.Content>
						<View
							style={[
								styles.previewBox,
								{
									backgroundColor: colors.background,
									borderColor: colors.border,
								},
							]}
						>
							<Text style={[styles.previewText, {color: colors.onSurface}]}>
								{preview}
							</Text>
						</View>
						<Text style={[styles.previewHint, {color: colors.onSurfaceMuted}]}>
							{language === 'en'
								? `This text (~${preview.length} chars) is prepended to the system prompt.`
								: `Dieser Text (~${preview.length} Zeichen wird dem Systemprompt vorangestellt.`}
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={() => setShowPreview(false)}
							textColor={colors.primary}
						>
							OK
						</Button>
					</Dialog.Actions>
				</Dialog>

				<Dialog
					visible={showAddDialog}
					onDismiss={() => setShowAddDialog(false)}
					style={{backgroundColor: colors.surface}}
				>
					<Dialog.Title style={{color: colors.onSurface}}>
						{language === 'en' ? 'Add Custom Field' : 'Feld hinzufügen'}
					</Dialog.Title>
					<Dialog.Content style={{gap: 12}}>
						<TextInput
							mode="outlined"
							label={
								language === 'en' ? 'Field Key (unique)' : 'Feld-Schlüssel'
							}
							value={newFieldKey}
							onChangeText={setNewFieldKey}
							style={{backgroundColor: colors.surface}}
							textColor={colors.onSurface}
							underlineColor={colors.border}
							activeUnderlineColor={colors.primary}
							dense
						/>
						<TextInput
							mode="outlined"
							label={language === 'en' ? 'Field Label' : 'Feld-Bezeichnung'}
							value={newFieldLabel}
							onChangeText={setNewFieldLabel}
							style={{backgroundColor: colors.surface}}
							textColor={colors.onSurface}
							underlineColor={colors.border}
							activeUnderlineColor={colors.primary}
							dense
						/>
						<TextInput
							mode="outlined"
							label={language === 'en' ? 'Value' : 'Wert'}
							value={newFieldValue}
							onChangeText={setNewFieldValue}
							style={{backgroundColor: colors.surface}}
							textColor={colors.onSurface}
							underlineColor={colors.border}
							activeUnderlineColor={colors.primary}
							dense
							multiline
						/>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={() => setShowAddDialog(false)}
							textColor={colors.onSurfaceMuted}
						>
							{language === 'en' ? 'Cancel' : 'Abbrechen'}
						</Button>
						<Button
							onPress={handleAddField}
							disabled={!newFieldKey.trim() || !newFieldLabel.trim()}
							textColor={colors.primary}
						>
							{language === 'en' ? 'Add' : 'Hinzufügen'}
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
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
		marginBottom: 20,
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
		lineHeight: 20,
	},
	languageToggle: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 12,
		marginBottom: 20,
	},
	langButton: {
		flex: 1,
	},
	fieldCard: {
		marginBottom: 12,
		borderWidth: 1,
		borderRadius: 12,
	},
	fieldContent: {
		gap: 8,
	},
	fieldHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	fieldHeaderLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		flex: 1,
	},
	fieldLabel: {
		fontSize: 14,
		fontWeight: '600',
	},
	fieldInput: {
		fontSize: 14,
	},
	fieldInputContent: {},
	addButton: {
		marginBottom: 20,
		borderRadius: 10,
	},
	actionRow: {
		flexDirection: 'row',
		gap: 12,
		marginBottom: 20,
	},
	actionButton: {
		flex: 1,
		borderRadius: 10,
	},
	infoBox: {
		borderWidth: 1,
		borderRadius: 12,
		padding: 16,
	},
	infoTitle: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 8,
	},
	infoText: {
		fontSize: 13,
		lineHeight: 18,
	},
	previewBox: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		marginBottom: 8,
	},
	previewText: {
		fontSize: 13,
		lineHeight: 18,
		fontFamily: 'monospace',
	},
	previewHint: {
		fontSize: 11,
		marginTop: 4,
	},
})
