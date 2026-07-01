import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, TextInput, IconButton, ActivityIndicator, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeContext } from '@/constants/themes';
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
  const { colors } = useThemeContext();

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
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background }]}
        edges={['bottom']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.onSurfaceMuted }]}>
            Loading skills...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.statsRow,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.onSurface }]}>{totalTerms}</Text>
            <Text style={[styles.statLabel, { color: colors.onSurfaceMuted }]}>Total</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.success }]}>{enabledTerms}</Text>
            <Text style={[styles.statLabel, { color: colors.onSurfaceMuted }]}>Active</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{customCount}</Text>
            <Text style={[styles.statLabel, { color: colors.onSurfaceMuted }]}>Custom</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            mode="flat"
            placeholder="Search skills..."
            placeholderTextColor={colors.onSurfaceFaint}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { backgroundColor: colors.surface }]}
            contentStyle={[styles.searchContent, { color: colors.onSurface }]}
            textColor={colors.onSurface}
            underlineColor={colors.border}
            activeUnderlineColor={colors.primary}
            left={<TextInput.Icon icon="magnify" color={colors.onSurfaceMuted} />}
          />
          <IconButton
            icon="tray-arrow-down"
            size={24}
            iconColor={colors.primary}
            onPress={() => setImportModalVisible(true)}
            style={styles.importButton}
          />
          <IconButton
            icon="tray-arrow-up"
            size={24}
            iconColor={colors.secondary}
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
            <Text style={[styles.emptyTitle, { color: colors.onSurface }]}>No skills found</Text>
            <Text style={[styles.emptySubtitle, { color: colors.onSurfaceMuted }]}>
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
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  searchInput: {
    flex: 1,
  },
  searchContent: {},
  importButton: {
    backgroundColor: 'rgba(30, 32, 41, 1)',
  },
  exportButton: {
    backgroundColor: 'rgba(30, 32, 41, 1)',
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
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
    flex: 1,
  },
  categoryCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  collapseIcon: {
    fontSize: 12,
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
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 16,
  },
});
