import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Share } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Chip,
  ActivityIndicator,
  ProgressBar,
  Surface,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { haloColors } from '@/constants/haloTheme';
import { useLocalLLM, type Language } from '@/hooks/useLocalLLM';
import { addHistoryItem } from '@/hooks/useDatabase';

function LanguageToggle({
  language,
  onToggle,
}: {
  language: Language;
  onToggle: (lang: Language) => void;
}) {
  return (
    <View style={toggleStyles.container}>
      <Chip
        selected={language === 'en'}
        onPress={() => onToggle('en')}
        style={[toggleStyles.chip, language === 'en' && toggleStyles.chipSelected]}
        textStyle={[toggleStyles.chipText, language === 'en' && toggleStyles.chipTextSelected]}
        mode="flat">
        🇬🇧 English
      </Chip>
      <Chip
        selected={language === 'de'}
        onPress={() => onToggle('de')}
        style={[toggleStyles.chip, language === 'de' && toggleStyles.chipSelected]}
        textStyle={[toggleStyles.chipText, language === 'de' && toggleStyles.chipTextSelected]}
        mode="flat">
        🇩🇪 Deutsch
      </Chip>
    </View>
  );
}

const toggleStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: haloColors.surface,
    borderWidth: 1,
    borderColor: haloColors.border,
  },
  chipSelected: {
    backgroundColor: haloColors.primary,
    borderColor: haloColors.primary,
  },
  chipText: {
    color: haloColors.onSurfaceMuted,
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});

export default function TranslatorScreen() {
  const [inputTerm, setInputTerm] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [hasGenerated, setHasGenerated] = useState(false);

  const {
    downloadState,
    downloadProgress,
    initState,
    generationState,
    generatedText,
    error,
    generateAnalogy,
    retryDownload,
  } = useLocalLLM();

  const handleSubmit = useCallback(async () => {
    if (!inputTerm.trim()) return;

    const result = await generateAnalogy(inputTerm.trim(), language);
    if (result) {
      setHasGenerated(true);
      await addHistoryItem(inputTerm.trim(), result, language);
    }
  }, [inputTerm, language, generateAnalogy]);

  const handleShare = useCallback(async () => {
    if (!generatedText) return;

    try {
      const shareContent =
        language === 'en'
          ? `📝 **${inputTerm}**\n\n💡 ${generatedText}`
          : `📝 **${inputTerm}**\n\n💡 ${generatedText}`;

      await Share.share({
        message: shareContent,
        title: language === 'en' ? 'Noobify Result' : 'Noobify Ergebnis',
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  }, [generatedText, inputTerm, language]);

  const handleClear = useCallback(() => {
    setInputTerm('');
    setHasGenerated(false);
  }, []);

  const renderContent = () => {
    if (downloadState === 'checking' || downloadState === 'downloading') {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color={haloColors.primary} />
          <Text style={styles.statusText}>
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
            color={haloColors.primary}
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>{downloadProgress}%</Text>
        </View>
      );
    }

    if (downloadState === 'error') {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={retryDownload} style={styles.retryButton}>
            {language === 'en' ? 'Retry Download' : 'Erneut versuchen'}
          </Button>
        </View>
      );
    }

    if (initState === 'initializing') {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color={haloColors.primary} />
          <Text style={styles.statusText}>
            {language === 'en' ? 'Initializing AI model...' : 'Initialisiere KI-Modell...'}
          </Text>
        </View>
      );
    }

    if (initState === 'error') {
      return (
        <View style={styles.statusContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <>
        <Surface style={styles.inputSurface}>
          <LanguageToggle language={language} onToggle={setLanguage} />

          <TextInput
            mode="flat"
            label={language === 'en' ? 'Enter tech term...' : 'Fachbegriff eingeben...'}
            placeholder={
              language === 'en'
                ? 'e.g. recursion, API, blockchain'
                : 'z.B. Rekursion, API, Blockchain'
            }
            value={inputTerm}
            onChangeText={setInputTerm}
            style={styles.input}
            contentStyle={styles.inputContent}
            textColor={haloColors.onSurface}
            underlineColor={haloColors.border}
            activeUnderlineColor={haloColors.primary}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            disabled={generationState === 'generating'}
          />

          <View style={styles.buttonRow}>
            {hasGenerated && (
              <Button
                mode="outlined"
                onPress={handleClear}
                style={styles.clearButton}
                textColor={haloColors.onSurfaceMuted}>
                {language === 'en' ? 'Clear' : 'Löschen'}
              </Button>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              buttonColor={haloColors.primary}
              loading={generationState === 'generating'}
              disabled={
                !inputTerm.trim() || generationState === 'generating' || initState !== 'ready'
              }>
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
          <Card style={styles.resultCard}>
            <Card.Content>
              <Text style={styles.resultLabel}>
                {language === 'en' ? 'Your analogy:' : 'Deine Analogie:'}
              </Text>
              <Text style={styles.resultText}>{generatedText}</Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button mode="text" onPress={handleShare} icon="share" textColor={haloColors.primary}>
                {language === 'en' ? 'Share' : 'Teilen'}
              </Button>
            </Card.Actions>
          </Card>
        )}

        {generationState === 'error' && (
          <Card style={[styles.resultCard, styles.errorCard]}>
            <Card.Content>
              <Text style={styles.errorCardText}>{error}</Text>
            </Card.Content>
          </Card>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>
            {language === 'en' ? 'Explain it simply 💡' : 'Erkläre es einfach 💡'}
          </Text>
          <Text style={styles.subtitle}>
            {language === 'en'
              ? 'Enter any tech term and get an everyday analogy'
              : 'Gib einen beliebigen Fachbegriff ein und erhalte eine alltägliche Analogie'}
          </Text>
        </View>

        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: haloColors.background,
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
    color: haloColors.onSurface,
    textAlign: 'center',
    letterSpacing: -0.02,
  },
  subtitle: {
    fontSize: 14,
    color: haloColors.onSurfaceMuted,
    textAlign: 'center',
    marginTop: 8,
  },
  inputSurface: {
    backgroundColor: haloColors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: haloColors.border,
    gap: 16,
  },
  input: {
    backgroundColor: haloColors.surface,
    fontSize: 16,
  },
  inputContent: {
    color: haloColors.onSurface,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  clearButton: {
    flex: 1,
    borderColor: haloColors.border,
  },
  submitButton: {
    flex: 2,
  },
  resultCard: {
    marginTop: 20,
    backgroundColor: haloColors.surface,
    borderWidth: 1,
    borderColor: haloColors.border,
    borderRadius: 16,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: haloColors.onSurfaceMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.08,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: haloColors.onSurface,
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
    color: haloColors.onSurfaceMuted,
    textAlign: 'center',
  },
  progressBar: {
    width: '80%',
    height: 6,
    borderRadius: 3,
    backgroundColor: haloColors.surface,
  },
  progressText: {
    fontSize: 14,
    color: haloColors.onSurfaceFaint,
    fontFamily: 'monospace',
  },
  errorText: {
    fontSize: 14,
    color: haloColors.error,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    marginTop: 8,
  },
  errorCard: {
    borderColor: haloColors.error,
    marginTop: 20,
  },
  errorCardText: {
    fontSize: 14,
    color: haloColors.error,
  },
});
