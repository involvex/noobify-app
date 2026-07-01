import { useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, IconButton, Button } from 'react-native-paper';

import { haloColors } from '@/constants/haloTheme';

interface AddSkillModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSave: (skill: {
    name: string;
    aliases: string[];
    whatItIs: string;
    analogy: string;
    keyTraits: string[];
    commonComparisons: string[];
  }) => void;
}

export function AddSkillModal({ visible, onDismiss, onSave }: AddSkillModalProps) {
  const [name, setName] = useState('');
  const [aliases, setAliases] = useState('');
  const [whatItIs, setWhatItIs] = useState('');
  const [analogy, setAnalogy] = useState('');
  const [keyTraits, setKeyTraits] = useState('');
  const [commonComparisons, setCommonComparisons] = useState('');

  const handleSave = () => {
    if (!name.trim() || !whatItIs.trim() || !analogy.trim()) return;

    onSave({
      name: name.trim(),
      aliases: aliases
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      whatItIs: whatItIs.trim(),
      analogy: analogy.trim(),
      keyTraits: keyTraits
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      commonComparisons: commonComparisons
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
    });

    setName('');
    setAliases('');
    setWhatItIs('');
    setAnalogy('');
    setKeyTraits('');
    setCommonComparisons('');
    onDismiss();
  };

  const isValid = name.trim() && whatItIs.trim() && analogy.trim();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Custom Skill</Text>
            <IconButton
              icon="close"
              size={24}
              iconColor={haloColors.onSurfaceMuted}
              onPress={onDismiss}
            />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <TextInput
              label="Term Name *"
              value={name}
              onChangeText={setName}
              mode="flat"
              style={styles.input}
              contentStyle={styles.inputContent}
              textColor={haloColors.onSurface}
              underlineColor={haloColors.border}
              activeUnderlineColor={haloColors.primary}
              placeholder="e.g., MyFramework"
            />

            <TextInput
              label="Aliases (comma-separated)"
              value={aliases}
              onChangeText={setAliases}
              mode="flat"
              style={styles.input}
              contentStyle={styles.inputContent}
              textColor={haloColors.onSurface}
              underlineColor={haloColors.border}
              activeUnderlineColor={haloColors.primary}
              placeholder="e.g., my-framework, myfw"
            />

            <TextInput
              label="What it is *"
              value={whatItIs}
              onChangeText={setWhatItIs}
              mode="flat"
              style={styles.input}
              contentStyle={styles.inputContent}
              textColor={haloColors.onSurface}
              underlineColor={haloColors.border}
              activeUnderlineColor={haloColors.primary}
              placeholder="Short description of what this term means"
            />

            <TextInput
              label="Analogy *"
              value={analogy}
              onChangeText={setAnalogy}
              mode="flat"
              style={styles.input}
              contentStyle={styles.inputContent}
              textColor={haloColors.onSurface}
              underlineColor={haloColors.border}
              activeUnderlineColor={haloColors.primary}
              placeholder="A simple everyday analogy to explain this term"
              multiline
              numberOfLines={3}
            />

            <TextInput
              label="Key Traits (comma-separated)"
              value={keyTraits}
              onChangeText={setKeyTraits}
              mode="flat"
              style={styles.input}
              contentStyle={styles.inputContent}
              textColor={haloColors.onSurface}
              underlineColor={haloColors.border}
              activeUnderlineColor={haloColors.primary}
              placeholder="e.g., Fast, Type-safe, Modern"
            />

            <TextInput
              label="Similar Concepts (comma-separated)"
              value={commonComparisons}
              onChangeText={setCommonComparisons}
              mode="flat"
              style={styles.input}
              contentStyle={styles.inputContent}
              textColor={haloColors.onSurface}
              underlineColor={haloColors.border}
              activeUnderlineColor={haloColors.primary}
              placeholder="e.g., React, Vue, Angular"
            />
          </ScrollView>

          <View style={styles.actions}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              textColor={haloColors.onSurfaceMuted}
              style={styles.cancelButton}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              disabled={!isValid}
              buttonColor={haloColors.primary}
              style={styles.saveButton}>
              Save Skill
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    maxHeight: '90%',
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
  scrollContent: {
    padding: 20,
    gap: 4,
  },
  input: {
    backgroundColor: haloColors.surface,
    marginBottom: 12,
  },
  inputContent: {
    color: haloColors.onSurface,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    paddingBottom: 32,
  },
  cancelButton: {
    flex: 1,
    borderColor: haloColors.border,
  },
  saveButton: {
    flex: 2,
  },
});
