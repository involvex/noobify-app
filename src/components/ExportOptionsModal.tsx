import {Text, IconButton, Button} from 'react-native-paper'
import {View, StyleSheet, Modal} from 'react-native'
import {Share} from 'react-native'

import type {HistoryItem} from '@/hooks/useDatabase'
import {haloColors} from '@/constants/haloTheme'

interface ExportOptionsModalProps {
	visible: boolean
	selectedItems: HistoryItem[]
	onDismiss: () => void
}

export function ExportOptionsModal({
	visible,
	selectedItems,
	onDismiss,
}: ExportOptionsModalProps) {
	const handleExportJSON = async () => {
		const exportData = {
			version: 1,
			app: 'noobify',
			type: 'history',
			exportedAt: new Date().toISOString(),
			items: selectedItems.map(item => ({
				term: item.original_term,
				analogy: item.analogy,
				language: item.language,
				category: item.category,
				timestamp: item.timestamp,
			})),
		}

		try {
			await Share.share({
				message: JSON.stringify(exportData, null, 2),
				title: 'Noobify History Export',
			})
		} catch (err) {
			console.error('Export failed:', err)
		}
		onDismiss()
	}

	const handleShareAsText = async () => {
		const shareContent = selectedItems
			.map(item => {
				const flag = item.language === 'en' ? '🇬🇧' : '🇩🇪'
				return `${flag} ${item.original_term}\n💡 ${item.analogy}`
			})
			.join('\n\n---\n\n')

		try {
			await Share.share({
				message: shareContent,
				title: 'Noobify Explanations',
			})
		} catch (err) {
			console.error('Share failed:', err)
		}
		onDismiss()
	}

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onDismiss}
		>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.title}>
							Export {selectedItems.length} Items
						</Text>
						<IconButton
							icon="close"
							size={24}
							iconColor={haloColors.onSurfaceMuted}
							onPress={onDismiss}
						/>
					</View>

					<View style={styles.content}>
						<Text style={styles.description}>
							Choose how to export your selected history items.
						</Text>

						<Button
							mode="contained"
							onPress={handleExportJSON}
							buttonColor={haloColors.primary}
							style={styles.actionButton}
							icon="code-braces"
						>
							Export as JSON
						</Button>

						<Button
							mode="outlined"
							onPress={handleShareAsText}
							style={styles.actionButton}
							textColor={haloColors.onSurface}
							icon="share"
						>
							Share as Text
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'center',
		padding: 24,
	},
	container: {
		backgroundColor: haloColors.surface,
		borderRadius: 20,
		maxHeight: '80%',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: haloColors.onSurface,
	},
	content: {
		padding: 20,
		gap: 12,
	},
	description: {
		fontSize: 15,
		color: haloColors.onSurfaceMuted,
		lineHeight: 22,
		marginBottom: 8,
	},
	actionButton: {
		marginTop: 4,
	},
})
