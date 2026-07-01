import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, TextInput, IconButton, ActivityIndicator, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { haloColors } from '@/constants/haloTheme';
import { useSkills, type ManagedSkill } from '@/hooks/useSkills';
import { SkillCard } from '@/components/SkillCard';
import { SkillDetailModal } from '@/components/SkillDetailModal';
import { AddSkillModal } from '@/components/AddSkillModal';
import { ImportExportModal } from '@/components/ImportExportModal';
import type { TermDefinition } from '@/skills/types';
import type { CustomSkill } from '@/hooks/useDatabase';

const CATEGORY_ICONS: Record<string, string> = {
  'web-dev': '🌐',
  programming: '💻',
  devops: '🔧',
  'ai-data': '🤖',
  custom: '✨',
};

function CategorySection({
  category,
  label,
  terms,
  collapsed,
  onToggleCollapse,
  onToggleSkill,
  onPressSkill,
}: {
  category: string;
  label: string;
  terms: ManagedSkill[];
  collapsed: boolean;
  onToggleCollapse: () => void;
  onToggleSkill: (name: string, enabled: boolean) => void;
  onPressSkill: (term: TermDefinition, isCustom: boolean) => void;
}) {
  const enabledCount = terms.filter((t) => t.enabled).length;

  return (
    <View style={styles.categorySection}>
      <Pressable onPress={onToggleCollapse} style={styles.categoryHeader}>
        <View style={styles.categoryHeaderLeft}>
          <Text style={styles.categoryIcon}>{CATEGORY_ICONS[category] ?? '📁'}</Text>
          <Text style={styles.categoryLabel}>{label}</Text>
          <Text style={styles.categoryCount}>
            {enabledCount}/{terms.length}
          </Text>
        </View>
        <Text style={styles.collapseIcon}>{collapsed ? '▶' : '▼'}</Text>
      </Pressable>

      {!collapsed && (
        <View style={styles.termsList}>
          {terms.map((term) => (
            <SkillCard
              key={term.name}
              term={term}
              isCustom={term.isCustom}
              enabled={term.enabled}
              onToggle={onToggleSkill}
              onPress={(t) => onPressSkill(t, term.isCustom)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default function SkillsScreen() {
  const {
    categories,
    loading,
    searchQuery,
    setSearchQuery,
    toggleSkill,
    addSkill,
    removeSkill,
    exportSkills,
    importSkills,
    totalTerms,
    enabledTerms,
    customCount,
  } = useSkills();

  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [detailModal, setDetailModal] = useState<{
    visible: boolean;
    term: TermDefinition | null;
    isCustom: boolean;
  }>({
    visible: false,
    term: null,
    isCustom: false,
  });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [customSkills, setCustomSkills] = useState<CustomSkill[]>([]);

  const toggleCollapse = useCallback((category: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const handlePressSkill = useCallback((term: TermDefinition, isCustom: boolean) => {
    setDetailModal({ visible: true, term, isCustom });
  }, []);

  const handleDeleteSkill = useCallback(
    async (name: string) => {
      await removeSkill(name);
      setDetailModal({ visible: false, term: null, isCustom: false });
    },
    [removeSkill],
  );

  const handleExportPress = useCallback(async () => {
    const skills = await exportSkills();
    setCustomSkills(skills);
    setExportModalVisible(true);
  }, [exportSkills]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={haloColors.primary} />
          <Text style={styles.loadingText}>Loading skills...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalTerms}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: haloColors.success }]}>{enabledTerms}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: haloColors.primary }]}>{customCount}</Text>
            <Text style={styles.statLabel}>Custom</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            mode="flat"
            placeholder="Search skills..."
            placeholderTextColor={haloColors.onSurfaceFaint}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            contentStyle={styles.searchContent}
            textColor={haloColors.onSurface}
            underlineColor={haloColors.border}
            activeUnderlineColor={haloColors.primary}
            left={<TextInput.Icon icon="magnify" color={haloColors.onSurfaceMuted} />}
          />
          <IconButton
            icon="tray-arrow-down"
            size={24}
            iconColor={haloColors.primary}
            onPress={() => setImportModalVisible(true)}
            style={styles.importButton}
          />
          <IconButton
            icon="tray-arrow-up"
            size={24}
            iconColor={haloColors.secondary}
            onPress={handleExportPress}
            style={styles.exportButton}
          />
        </View>

        {categories.map((cat) => (
          <CategorySection
            key={cat.category}
            category={cat.category}
            label={cat.label}
            terms={cat.terms}
            collapsed={collapsedCategories.has(cat.category)}
            onToggleCollapse={() => toggleCollapse(cat.category)}
            onToggleSkill={toggleSkill}
            onPressSkill={handlePressSkill}
          />
        ))}

        {categories.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No skills found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Try a different search term' : 'Add custom skills to get started'}
            </Text>
          </View>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        color="#FFFFFF"
        onPress={() => setAddModalVisible(true)}
      />

      <SkillDetailModal
        visible={detailModal.visible}
        term={detailModal.term}
        isCustom={detailModal.isCustom}
        enabled={
          detailModal.term
            ? (categories.flatMap((c) => c.terms).find((t) => t.name === detailModal.term?.name)
                ?.enabled ?? true)
            : true
        }
        onDismiss={() => setDetailModal({ visible: false, term: null, isCustom: false })}
        onToggle={toggleSkill}
        onDelete={detailModal.isCustom ? handleDeleteSkill : undefined}
      />

      <AddSkillModal
        visible={addModalVisible}
        onDismiss={() => setAddModalVisible(false)}
        onSave={addSkill}
      />

      <ImportExportModal
        visible={exportModalVisible}
        mode="export"
        skills={customSkills}
        onDismiss={() => setExportModalVisible(false)}
      />

      <ImportExportModal
        visible={importModalVisible}
        mode="import"
        skills={[]}
        onDismiss={() => setImportModalVisible(false)}
        onImport={importSkills}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: haloColors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: haloColors.onSurfaceMuted,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: haloColors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: haloColors.border,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: haloColors.onSurface,
  },
  statLabel: {
    fontSize: 12,
    color: haloColors.onSurfaceMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: haloColors.border,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  searchInput: {
    flex: 1,
    backgroundColor: haloColors.surface,
  },
  searchContent: {
    color: haloColors.onSurface,
  },
  importButton: {
    backgroundColor: haloColors.elevated,
  },
  exportButton: {
    backgroundColor: haloColors.elevated,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: haloColors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: haloColors.border,
  },
  categoryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: haloColors.onSurface,
    flex: 1,
  },
  categoryCount: {
    fontSize: 13,
    color: haloColors.onSurfaceMuted,
    fontWeight: '500',
  },
  collapseIcon: {
    fontSize: 12,
    color: haloColors.onSurfaceMuted,
  },
  termsList: {
    marginTop: 8,
    paddingLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: haloColors.onSurface,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: haloColors.onSurfaceMuted,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: haloColors.primary,
    borderRadius: 16,
  },
});
