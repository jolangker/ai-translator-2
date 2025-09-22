import { ref } from 'vue';
import type { TranslationPayload, TranslationResult } from '../types/translation';

export function useTranslation() {
  const status = ref<string>('idle');
  const isTranslating = ref<boolean>(false);
  const API_URL = import.meta.env.VITE_TRANSLATOR_API_URL;

  const setStatus = (text: string): void => {
    status.value = `Status: ${text}`;
  };

  const translateText = async (text: string, targetLanguage: string): Promise<string> => {
    if (!text.trim()) return '';

    setStatus('translating...');
    isTranslating.value = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const payload: TranslationPayload = { text, targetLanguage };
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const translatedText = await res.text() as TranslationResult;
      setStatus('done');
      return translatedText;
    } catch (e) {
      console.warn(e);
      setStatus('translation failed');
      return '';
    } finally {
      isTranslating.value = false;
    }
  };

  // Utility for speech synthesis
  const speakText = (text: string, lang?: string): void => {
    if (!text || text === '—') return;

    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang || 'en';
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
    } else {
      alert('Speech synthesis not supported in this browser.');
    }
  };

  // Utility for clipboard operations
  const copyToClipboard = async (text: string): Promise<void> => {
    if (!text || text === '—') return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.warn('Failed to copy:', e);
    }
  };

  return {
    status,
    isTranslating,
    translateText,
    speakText,
    copyToClipboard
  };
}
