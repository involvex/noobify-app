import { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, IconButton, Button } from 'react-native-paper';
import { Share } from 'react-native';

import { haloColors } from '@/constants/haloTheme';
import type { CustomSkill } from '@/hooks/useDatabase';

interface ImportExportModalProps {
  visible: boolean;
  mode: 'export' | 'import';
  skills: CustomSkill[];
  onDismiss: () => void;
  onImport?: (skills: Omit<CustomSkill, 'id' | 'created_at' | 'updated_at'>[]) => void;
}

export function ImportExportModal({
  visible,
  mode,
  skills,
  onDismiss,
  onImport,
}: ImportExportModalProps) {
  const [importText, setImportText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    const exportData = {
      version: 1,
      app: 'noobify',
      exportedAt: new Date().toISOString(),
      skills: skills.map((s) => ({
        name: s.name,
        aliases: s.aliases,
        category: s.category,
        what_it_is: s.what_it_is,
        analogy: s.analogy,
        key_traits: s.key_traits,
        common_comparisons: s.common_comparisons,
      })),
    };

    try {
      await Share.share({
        message: JSON.stringify(exportData, null, 2),
        title: 'Noobify Skills Export',
      });
    } catch (err) {
      console.error('Export failed:', err);
    }
    onDismiss();
  };

  const handleImport = () => {
    setError(null);
    try {
      const data = JSON.parse(importText);
      if (!data.skills || !Array.isArray(data.skills)) {
        setError('Invalid format: missing "skills" array');
        return;
      }

      const validSkills = data.skills.filter(
        (s: Omit<CustomSkill, 'id' | 'created_at' | 'updated_at'>) =>
          s.name && s.what_it_is && s.analogy,
      );

      if (validSkills.length === 0) {
        setError('No valid skills found in import data');
        return;
      }

      onImport?.(validSkills);
      setImportText('');
      onDismiss();
    } catch {
      setError('Invalid JSON format');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === 'export' ? 'Export Skills' : 'Import Skills'}
            </Text>
            <IconButton
              icon="close"
              size={24}
              iconColor={haloColors.onSurfaceMuted}
              onPress={onDismiss}
            />
          </View>

          <View style={styles.content}>
            {mode === 'export' ? (
              <>
                <Text style={styles.description}>
                  Share your {skills.length} custom skill{skills.length !== 1 ? 's' : ''} as a JSON
                  file.
                </Text>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    Exported skills can be imported on another device running Noobify.
                  </Text>
                </View>
                <Button
                  mode="contained"
                  onPress={handleExport}
                  disabled={skills.length === 0}
                  buttonColor={haloColors.primary}
                  style={styles.actionButton}
                  icon="share">
                  Share Export
                </Button>
              </>
            ) : (
              <>
                <Text style={styles.description}>
                  Paste a Noobify skills export to import custom terms.
                </Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Paste JSON export:</Text>
                  <View style={styles.codeBox}>
                    <Text style={styles.codePlaceholder}>
                      {'{"version":1,"app":"noobify","skills":[...]}'}
                    </Text>
                  </View>
                </View>
                {error && (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}
                <Button
                  mode="contained"
                  onPress={handleImport}
                  disabled={!importText.trim()}
                  buttonColor={haloColors.primary}
                  style={styles.actionButton}
                  icon="import">
                  Import Skills
                </Button>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
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
  },
  description: {
    fontSize: 15,
    color: haloColors.onSurfaceMuted,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: haloColors.elevated,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 13,
    color: haloColors.onSurfaceMuted,
    lineHeight: 18,
  },
  actionButton: {
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: haloColors.onSurfaceMuted,
    marginBottom: 8,
  },
  codeBox: {
    backgroundColor: haloColors.elevated,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: haloColors.border,
  },
  codePlaceholder: {
    fontSize: 12,
    color: haloColors.onSurfaceFaint,
    fontFamily: 'monospace',
  },
  errorBox: {
    backgroundColor: 'rgba(255, 58, 92, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: haloColors.error,
  },
  errorText: {
    fontSize: 13,
    color: haloColors.error,
  },
});
