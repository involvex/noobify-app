import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Switch } from 'react-native-paper';

import { haloColors } from '@/constants/haloTheme';
import type { TermDefinition } from '@/skills/types';

interface SkillCardProps {
  term: TermDefinition;
  isCustom?: boolean;
  enabled: boolean;
  onToggle: (name: string, enabled: boolean) => void;
  onPress: (term: TermDefinition) => void;
}

export function SkillCard({ term, isCustom = false, enabled, onToggle, onPress }: SkillCardProps) {
  return (
    <Pressable onPress={() => onPress(term)} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, !enabled && styles.nameDisabled]} numberOfLines={1}>
              {term.name}
            </Text>
            {isCustom && (
              <View style={styles.customBadge}>
                <Text style={styles.customBadgeText}>Custom</Text>
              </View>
            )}
          </View>
          <Switch
            value={enabled}
            onValueChange={(val) => onToggle(term.name, val)}
            trackColor={{ false: haloColors.border, true: haloColors.primaryPressed }}
            thumbColor={enabled ? haloColors.primary : haloColors.onSurfaceMuted}
            style={styles.switch}
          />
        </View>
        <Text
          style={[styles.description, !enabled && styles.descriptionDisabled]}
          numberOfLines={2}>
          {term.whatItIs}
        </Text>
        {term.aliases.length > 0 && (
          <Text style={styles.aliases}>Also: {term.aliases.slice(0, 3).join(', ')}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: haloColors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: haloColors.border,
    marginBottom: 8,
  },
  content: {
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: haloColors.onSurface,
  },
  nameDisabled: {
    color: haloColors.onSurfaceFaint,
  },
  customBadge: {
    backgroundColor: haloColors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  customBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  switch: {
    marginLeft: 8,
  },
  description: {
    fontSize: 13,
    color: haloColors.onSurfaceMuted,
    lineHeight: 18,
    marginBottom: 4,
  },
  descriptionDisabled: {
    color: haloColors.onSurfaceFaint,
  },
  aliases: {
    fontSize: 11,
    color: haloColors.onSurfaceFaint,
    fontStyle: 'italic',
  },
});
