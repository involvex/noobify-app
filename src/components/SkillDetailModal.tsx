import { View, StyleSheet, ScrollView, Modal } from 'react-native';
import { Text, IconButton, Switch, Chip } from 'react-native-paper';

import { haloColors } from '@/constants/haloTheme';
import type { TermDefinition } from '@/skills/types';

interface SkillDetailModalProps {
  visible: boolean;
  term: TermDefinition | null;
  isCustom?: boolean;
  enabled?: boolean;
  onDismiss: () => void;
  onToggle?: (name: string, enabled: boolean) => void;
  onDelete?: (name: string) => void;
}

export function SkillDetailModal({
  visible,
  term,
  isCustom = false,
  enabled = true,
  onDismiss,
  onToggle,
  onDelete,
}: SkillDetailModalProps) {
  if (!term) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text style={styles.title}>{term.name}</Text>
                {isCustom && (
                  <View style={styles.customBadge}>
                    <Text style={styles.customBadgeText}>Custom</Text>
                  </View>
                )}
              </View>
              <IconButton
                icon="close"
                size={24}
                iconColor={haloColors.onSurfaceMuted}
                onPress={onDismiss}
              />
            </View>

            {onToggle && (
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Enabled</Text>
                <Switch
                  value={enabled}
                  onValueChange={(val) => onToggle(term.name, val)}
                  trackColor={{ false: haloColors.border, true: haloColors.primaryPressed }}
                  thumbColor={enabled ? haloColors.primary : haloColors.onSurfaceMuted}
                />
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>What it is</Text>
              <Text style={styles.sectionText}>{term.whatItIs}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Analogy</Text>
              <Text style={styles.analogyText}>{term.analogy}</Text>
            </View>

            {term.keyTraits.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Key Traits</Text>
                <View style={styles.chipContainer}>
                  {term.keyTraits.map((trait, i) => (
                    <Chip key={i} style={styles.chip} textStyle={styles.chipText} mode="outlined">
                      {trait}
                    </Chip>
                  ))}
                </View>
              </View>
            )}

            {term.commonComparisons.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Similar Concepts</Text>
                <View style={styles.chipContainer}>
                  {term.commonComparisons.map((comp, i) => (
                    <Chip
                      key={i}
                      style={styles.compChip}
                      textStyle={styles.compChipText}
                      mode="outlined">
                      {comp}
                    </Chip>
                  ))}
                </View>
              </View>
            )}

            {isCustom && onDelete && (
              <View style={styles.deleteSection}>
                <IconButton
                  icon="delete-outline"
                  size={20}
                  iconColor={haloColors.error}
                  onPress={() => onDelete(term.name)}
                />
                <Text style={styles.deleteText}>Delete custom skill</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: haloColors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: haloColors.onSurface,
  },
  customBadge: {
    backgroundColor: haloColors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  customBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: haloColors.elevated,
    borderRadius: 10,
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: haloColors.onSurface,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: haloColors.onSurfaceMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.08,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 15,
    color: haloColors.onSurface,
    lineHeight: 22,
  },
  analogyText: {
    fontSize: 15,
    color: haloColors.onSurface,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: haloColors.elevated,
    borderColor: haloColors.border,
  },
  chipText: {
    color: haloColors.onSurface,
    fontSize: 12,
  },
  compChip: {
    backgroundColor: 'transparent',
    borderColor: haloColors.primary,
  },
  compChipText: {
    color: haloColors.primary,
    fontSize: 12,
  },
  deleteSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: haloColors.border,
  },
  deleteText: {
    fontSize: 14,
    color: haloColors.error,
  },
});
