import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Share } from 'react-native';
import { Text, Card, IconButton, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { haloColors } from '@/constants/haloTheme';
import { getHistory, deleteHistoryItem, type HistoryItem } from '@/hooks/useDatabase';

function HistoryCard({
  item,
  onDelete,
  onShare,
}: {
  item: HistoryItem;
  onDelete: (id: number) => void;
  onShare: (item: HistoryItem) => void;
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
    <Card style={styles.historyCard}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Text style={styles.languageFlag}>{languageLabel}</Text>
            <Text style={styles.termText}>{item.original_term}</Text>
          </View>
          <IconButton
            icon="delete-outline"
            size={20}
            iconColor={haloColors.onSurfaceFaint}
            onPress={() => onDelete(item.id)}
          />
        </View>
        <Text style={styles.analogyText}>{item.analogy}</Text>
        <Text style={styles.timestampText}>{formatDate(item.timestamp)}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <IconButton
          icon="share-outline"
          size={20}
          iconColor={haloColors.primary}
          onPress={() => onShare(item)}
        />
      </Card.Actions>
    </Card>
  );
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = useCallback(async () => {
    try {
      const items = await getHistory();
      setHistory(items);
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

  const handleDelete = useCallback(async (id: number) => {
    await deleteHistoryItem(id);
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

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

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyTitle}>No history yet</Text>
      <Text style={styles.emptySubtitle}>Your noobified terms will appear here</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={haloColors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HistoryCard item={item} onDelete={handleDelete} onShare={handleShare} />
        )}
        contentContainerStyle={[
          styles.listContent,
          history.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={renderEmptyState}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
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
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  emptyListContent: {
    flex: 1,
  },
  historyCard: {
    backgroundColor: haloColors.surface,
    borderWidth: 1,
    borderColor: haloColors.border,
    borderRadius: 12,
    marginBottom: 4,
  },
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
    color: haloColors.onSurface,
  },
  analogyText: {
    fontSize: 14,
    color: haloColors.onSurfaceMuted,
    lineHeight: 20,
    marginBottom: 8,
  },
  timestampText: {
    fontSize: 12,
    color: haloColors.onSurfaceFaint,
  },
  cardActions: {
    position: 'absolute',
    right: 0,
    top: 8,
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
    color: haloColors.onSurface,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: haloColors.onSurfaceMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
