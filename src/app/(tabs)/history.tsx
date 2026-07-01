import { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList, Share } from 'react-native';
import {
  Text,
  Card,
  IconButton,
  ActivityIndicator,
  TextInput,
  Chip,
  Button,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeContext } from '@/constants/themes';
import {
  getHistory,
  deleteHistoryItem,
  addFavorite,
  removeFavorite,
  getFavorites,
  type HistoryItem,
  type FavoriteItem,
} from '@/hooks/useDatabase';
import { ExportOptionsModal } from '@/components/ExportOptionsModal';

function HistoryCard({
  item,
  isFavorite,
  isSelected,
  isSelectionMode,
  colors,
  onDelete,
  onShare,
  onToggleFavorite,
  onSelect,
}: {
  item: HistoryItem;
  isFavorite: boolean;
  isSelected: boolean;
  isSelectionMode: boolean;
  colors: Record<string, string>;
  onDelete: (id: number) => void;
  onShare: (item: HistoryItem) => void;
  onToggleFavorite: (item: HistoryItem) => void;
  onSelect: (item: HistoryItem) => void;
}) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const languageLabel = item.language === 'en' ? '🇬🇧' : '🇩🇪';

  return (
    <Card
      style={[
        styles.historyCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
        isSelected && { borderColor: colors.primary, backgroundColor: 'rgba(91, 107, 255, 0.12)' },
      ]}
      onPress={() => isSelectionMode && onSelect(item)}
      onLongPress={() => onSelect(item)}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            {isSelectionMode && (
              <IconButton
                icon={isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={20}
                iconColor={isSelected ? colors.primary : colors.onSurfaceFaint}
                onPress={() => onSelect(item)}
              />
            )}
            <Text style={styles.languageFlag}>{languageLabel}</Text>
            <Text style={[styles.termText, { color: colors.onSurface }]}>{item.original_term}</Text>
          </View>
          {!isSelectionMode && (
            <View style={styles.cardActions}>
              <IconButton
                icon={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                iconColor={isFavorite ? colors.error : colors.onSurfaceFaint}
                onPress={() => onToggleFavorite(item)}
              />
              <IconButton
                icon="delete-outline"
                size={20}
                iconColor={colors.onSurfaceFaint}
                onPress={() => onDelete(item.id)}
              />
            </View>
          )}
        </View>
        <Text style={[styles.analogyText, { color: colors.onSurfaceMuted }]}>{item.analogy}</Text>
        <Text style={[styles.timestampText, { color: colors.onSurfaceFaint }]}>
          {formatDate(item.timestamp)}
        </Text>
      </Card.Content>
      {!isSelectionMode && (
        <Card.Actions style={styles.cardActionsBottom}>
          <IconButton
            icon="share-outline"
            size={20}
            iconColor={colors.primary}
            onPress={() => onShare(item)}
          />
        </Card.Actions>
      )}
    </Card>
  );
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLanguage, setFilterLanguage] = useState<'all' | 'en' | 'de'>('all');
  const [selectedItems, setSelectedItems] = useState<HistoryItem[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const { colors } = useThemeContext();

  const loadHistory = useCallback(async () => {
    try {
      const [items, favs] = await Promise.all([getHistory(), getFavorites()]);
      setHistory(items);
      setFavorites(favs);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch = item.original_term.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLanguage = filterLanguage === 'all' || item.language === filterLanguage;
      return matchesSearch && matchesLanguage;
    });
  }, [history, searchQuery, filterLanguage]);

  const handleDelete = useCallback(async (id: number) => {
    await deleteHistoryItem(id);
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleToggleFavorite = useCallback(
    async (item: HistoryItem) => {
      const isFav = favorites.some((f) => f.original_term === item.original_term);
      if (isFav) {
        const favToRemove = favorites.find((f) => f.original_term === item.original_term);
        if (favToRemove) {
          await removeFavorite(favToRemove.id);
          setFavorites((prev) => prev.filter((f) => f.id !== favToRemove.id));
        }
      } else {
        await addFavorite(item.original_term, item.analogy, item.language, item.category);
        const updatedFavs = await getFavorites();
        setFavorites(updatedFavs);
      }
    },
    [favorites],
  );

  const isFavorite = useCallback(
    (term: string) => favorites.some((f) => f.original_term === term),
    [favorites],
  );

  const handleShare = useCallback(async (item: HistoryItem) => {
    const shareContent =
      item.language === 'en'
        ? `📝 **${item.original_term}**\n\n💡 ${item.analogy}\n\nNoobified with ✨`
        : `📝 **${item.original_term}**\n\n💡 ${item.analogy}\n\nMit ✨ noobifiziert`;

    try {
      await Share.share({
        message: shareContent,
        title: item.language === 'en' ? 'Noobify Result' : 'Noobify Ergebnis',
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadHistory();
  }, [loadHistory]);

  const handleSelectItem = useCallback((item: HistoryItem) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((i) => i.id === item.id);
      if (isSelected) {
        const newSelected = prev.filter((i) => i.id !== item.id);
        if (newSelected.length === 0) {
          setIsSelectionMode(false);
        }
        return newSelected;
      }
      setIsSelectionMode(true);
      return [...prev, item];
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedItems.length === filteredHistory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...filteredHistory]);
    }
  }, [selectedItems, filteredHistory]);

  const handleDeleteSelected = useCallback(async () => {
    for (const item of selectedItems) {
      await deleteHistoryItem(item.id);
    }
    setHistory((prev) => prev.filter((item) => !selectedItems.some((s) => s.id === item.id)));
    setSelectedItems([]);
    setIsSelectionMode(false);
  }, [selectedItems]);

  const handleExportSelected = useCallback(() => {
    setShowExportModal(true);
  }, []);

  const renderEmptyState = () => {
    const isFiltered = searchQuery || filterLanguage !== 'all';
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>{isFiltered ? '🔍' : '📭'}</Text>
        <Text style={[styles.emptyTitle, { color: colors.onSurface }]}>
          {isFiltered ? 'No results found' : 'No history yet'}
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.onSurfaceMuted }]}>
          {isFiltered
            ? 'Try a different search or filter'
            : 'Your noobified terms will appear here'}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background }]}
        edges={['bottom']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.searchContainer}>
        <TextInput
          mode="flat"
          placeholder={filterLanguage === 'de' ? 'Verlauf durchsuchen...' : 'Search history...'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          contentStyle={styles.searchInputContent}
          textColor={colors.onSurface}
          underlineColor={colors.border}
          activeUnderlineColor={colors.primary}
          left={<TextInput.Icon icon="magnify" color={colors.onSurfaceFaint} />}
          right={
            searchQuery ? (
              <TextInput.Icon
                icon="close"
                color={colors.onSurfaceFaint}
                onPress={() => setSearchQuery('')}
              />
            ) : undefined
          }
        />
        <View style={styles.filterContainer}>
          <Chip
            selected={filterLanguage === 'all'}
            onPress={() => setFilterLanguage('all')}
            style={[
              styles.filterChip,
              { backgroundColor: colors.surface, borderColor: colors.border },
              filterLanguage === 'all' && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            textStyle={[
              styles.filterChipText,
              { color: colors.onSurfaceMuted },
              filterLanguage === 'all' && { color: '#FFFFFF' },
            ]}
            mode="flat">
            All
          </Chip>
          <Chip
            selected={filterLanguage === 'en'}
            onPress={() => setFilterLanguage('en')}
            style={[
              styles.filterChip,
              { backgroundColor: colors.surface, borderColor: colors.border },
              filterLanguage === 'en' && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            textStyle={[
              styles.filterChipText,
              { color: colors.onSurfaceMuted },
              filterLanguage === 'en' && { color: '#FFFFFF' },
            ]}
            mode="flat">
            🇬🇧 EN
          </Chip>
          <Chip
            selected={filterLanguage === 'de'}
            onPress={() => setFilterLanguage('de')}
            style={[
              styles.filterChip,
              { backgroundColor: colors.surface, borderColor: colors.border },
              filterLanguage === 'de' && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            textStyle={[
              styles.filterChipText,
              { color: colors.onSurfaceMuted },
              filterLanguage === 'de' && { color: '#FFFFFF' },
            ]}
            mode="flat">
            🇩🇪 DE
          </Chip>
        </View>
      </View>

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HistoryCard
            item={item}
            isFavorite={isFavorite(item.original_term)}
            isSelected={selectedItems.some((s) => s.id === item.id)}
            isSelectionMode={isSelectionMode}
            colors={colors}
            onDelete={handleDelete}
            onShare={handleShare}
            onToggleFavorite={handleToggleFavorite}
            onSelect={handleSelectItem}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          filteredHistory.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={renderEmptyState}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />

      {isSelectionMode && selectedItems.length > 0 && (
        <View
          style={[
            styles.batchActionBar,
            { backgroundColor: colors.surface, borderTopColor: colors.border },
          ]}>
          <Text style={[styles.batchActionText, { color: colors.onSurface }]}>
            {selectedItems.length} selected
          </Text>
          <View style={styles.batchActionButtons}>
            <Button mode="text" onPress={handleSelectAll} textColor={colors.onSurfaceMuted}>
              {selectedItems.length === filteredHistory.length ? 'Deselect All' : 'Select All'}
            </Button>
            <Button
              mode="text"
              onPress={handleExportSelected}
              textColor={colors.primary}
              icon="share">
              Export
            </Button>
            <Button
              mode="text"
              onPress={handleDeleteSelected}
              textColor={colors.error}
              icon="delete">
              Delete
            </Button>
          </View>
        </View>
      )}

      <ExportOptionsModal
        visible={showExportModal}
        selectedItems={selectedItems}
        onDismiss={() => {
          setShowExportModal(false);
          setSelectedItems([]);
          setIsSelectionMode(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    gap: 12,
  },
  searchInput: {
    height: 48,
  },
  searchInputContent: {
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    borderWidth: 1,
    height: 32,
  },
  filterChipSelected: {},
  filterChipText: {
    fontSize: 12,
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  emptyListContent: {
    flex: 1,
  },
  historyCard: {
    borderRadius: 12,
    marginBottom: 4,
  },
  historyCardSelected: {},
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  languageFlag: {
    fontSize: 16,
  },
  termText: {
    fontSize: 16,
    fontWeight: '600',
  },
  analogyText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  timestampText: {
    fontSize: 12,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActionsBottom: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  batchActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  batchActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  batchActionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
});
