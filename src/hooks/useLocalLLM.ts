import { useState, useCallback, useEffect, useRef } from 'react';
import { Paths, File } from 'expo-file-system';
import { initLlama, type LlamaContext } from 'llama.rn';

import { findTerm, generateContext, buildMergedIndex, getTermCategory } from '@/skills/_index';
import type { TermDefinition } from '@/skills/types';

const MODEL_FILE_NAME = 'qwen2.5-0.5b-instruct-q4_k_m.gguf';
const MODEL_URL =
  'https://huggingface.co/bartowski/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/Qwen2.5-0.5B-Instruct-Q4_K_M.gguf';

const EN_BASE_SYSTEM_PROMPT =
  'You are a witty tech translator for beginners. Explain tech terms using everyday analogies (cooking, cars, sports, etc.). Keep it under 60 words. Be accurate and helpful.';

const DE_BASE_SYSTEM_PROMPT =
  'Du bist ein lustiger Tech-Übersetzer für Anfänger. Erkläre technische Begriffe mit alltäglichen Analogien (Kochen, Autos, Sport, etc.). Halte es unter 60 Wörtern. Sei präzise und hilfsbereit.';

export type Language = 'en' | 'de';
export type DownloadState = 'idle' | 'checking' | 'downloading' | 'ready' | 'error';
export type GenerationState = 'idle' | 'generating' | 'done' | 'error';

export interface LLMState {
  downloadState: DownloadState;
  downloadProgress: number;
  initState: 'idle' | 'initializing' | 'ready' | 'error';
  generationState: GenerationState;
  generatedText: string;
  error: string | null;
  matchedTerm: TermDefinition | null;
  termCategory: string | null;
}

const initialState: LLMState = {
  downloadState: 'idle',
  downloadProgress: 0,
  initState: 'idle',
  generationState: 'idle',
  generatedText: '',
  error: null,
  matchedTerm: null,
  termCategory: null,
};

let _llamaContext: LlamaContext | null = null;

function getModelFile(): File {
  return new File(Paths.document, MODEL_FILE_NAME);
}

function getModelPath(): string {
  return getModelFile().uri;
}

async function buildEnhancedPrompt(
  term: string,
  language: Language,
): Promise<{
  systemPrompt: string;
  userPrompt: string;
  matchedTerm: TermDefinition | null;
  category: string | null;
}> {
  const index = await buildMergedIndex();
  const matchedTerm = findTerm(term, index);
  const category = matchedTerm ? getTermCategory(term, index) : null;

  if (!matchedTerm) {
    const baseSystem = language === 'en' ? EN_BASE_SYSTEM_PROMPT : DE_BASE_SYSTEM_PROMPT;
    const userPrompt =
      language === 'en'
        ? `Explain this tech term with a simple everyday analogy: ${term}`
        : `Erkläre diesen Fachbegriff mit einer einfachen alltäglichen Analogie: ${term}`;

    return { systemPrompt: baseSystem, userPrompt, matchedTerm: null, category: null };
  }

  const context = generateContext(matchedTerm, language);
  const categoryLabel = category ?? 'technology';

  let systemPrompt: string;
  if (language === 'en') {
    systemPrompt = [
      EN_BASE_SYSTEM_PROMPT,
      '',
      'You have expert knowledge about this specific term. Use the context below to ensure accuracy:',
      '',
      context,
      '',
      `The term belongs to the "${categoryLabel}" category.`,
    ].join('\n');
  } else {
    systemPrompt = [
      DE_BASE_SYSTEM_PROMPT,
      '',
      'Du hast Expertenwissen über diesen spezifischen Begriff. Nutze den Kontext unten für Genauigkeit:',
      '',
      context,
      '',
      `Der Begriff gehört zur Kategorie "${categoryLabel}".`,
    ].join('\n');
  }

  const userPrompt =
    language === 'en'
      ? `Explain this tech term with a simple everyday analogy: ${matchedTerm.name}`
      : `Erkläre diesen Fachbegriff mit einer einfachen alltäglichen Analogie: ${matchedTerm.name}`;

  return { systemPrompt, userPrompt, matchedTerm, category };
}

export function useLocalLLM() {
  const [state, setState] = useState<LLMState>(initialState);
  const contextRef = useRef<LlamaContext | null>(null);

  const checkAndDownloadModel = useCallback(async () => {
    setState((s) => ({ ...s, downloadState: 'checking', error: null }));

    try {
      const modelFile = getModelFile();

      const fileInfo = await modelFile.info();
      if (fileInfo.exists) {
        setState((s) => ({
          ...s,
          downloadState: 'ready',
          downloadProgress: 100,
        }));
        return true;
      }

      setState((s) => ({
        ...s,
        downloadState: 'downloading',
        downloadProgress: 0,
      }));

      await File.downloadFileAsync(MODEL_URL, modelFile);

      setState((s) => ({
        ...s,
        downloadState: 'ready',
        downloadProgress: 100,
      }));
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState((s) => ({
        ...s,
        downloadState: 'error',
        error: `Model download failed: ${errorMessage}`,
      }));
      return false;
    }
  }, []);

  const initializeLlama = useCallback(async () => {
    setState((s) => ({ ...s, initState: 'initializing', error: null }));

    try {
      const context = await initLlama({
        model: getModelPath(),
        n_ctx: 1024,
        n_gpu_layers: 0,
        use_mlock: true,
      });

      _llamaContext = context;
      contextRef.current = context;
      setState((s) => ({ ...s, initState: 'ready' }));
      return context;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState((s) => ({
        ...s,
        initState: 'error',
        error: `LLM init failed: ${errorMessage}`,
      }));
      return null;
    }
  }, []);

  const generateAnalogy = useCallback(
    async (term: string, language: Language) => {
      if (!contextRef.current) {
        const context = await initializeLlama();
        if (!context) return;
      }

      setState((s) => ({
        ...s,
        generationState: 'generating',
        generatedText: '',
        error: null,
        matchedTerm: null,
        termCategory: null,
      }));

      try {
        const { systemPrompt, userPrompt, matchedTerm, category } = await buildEnhancedPrompt(
          term,
          language,
        );

        const stopWords = [
          '</s>',
          '<|end|>',
          '<|eot_id|>',
          '<|end_of_text|>',
          '<|im_end|>',
          '<|EOT|>',
          '<|END_OF_TURN_TOKEN|>',
          '<|end_of_turn|>',
          '<|endoftext|>',
          '\n\n',
        ];

        let fullText = '';

        await contextRef.current!.completion(
          {
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            n_predict: 150,
            stop: stopWords,
            temperature: 0.7,
          },
          (data) => {
            fullText += data.token;
            setState((s) => ({ ...s, generatedText: fullText }));
          },
        );

        setState((s) => ({ ...s, generationState: 'done', matchedTerm, termCategory: category }));
        return fullText;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setState((s) => ({
          ...s,
          generationState: 'error',
          error: `Generation failed: ${errorMessage}`,
        }));
        return null;
      }
    },
    [initializeLlama],
  );

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const modelReady = await checkAndDownloadModel();
      if (modelReady && mounted) {
        await initializeLlama();
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [checkAndDownloadModel, initializeLlama]);

  return {
    ...state,
    modelPath: getModelPath(),
    generateAnalogy,
    retryDownload: checkAndDownloadModel,
  };
}
