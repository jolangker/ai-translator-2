<template>
  <div class="container" role="application" aria-label="AI Translator single page app">
    <header>
      <div class="logo">AI</div>
      <div>
        <h1>AI Translator</h1>
        <p class="subtitle">Detects input language and translates it to the selected target language.</p>
      </div>
    </header>

    <main class="grid">
      <translation-input
        v-model="inputText"
        :is-translating="isTranslating"
        @translate="handleTranslate"
        @swap="handleSwap"
      />
      <translation-output
        v-model="outputText"
        :target-lang="targetLang"
        :status="status"
      />
    </main>

    <footer>
      <div class="small">
        Tip: paste long paragraphs or multiple lines — the app will detect language automatically.
      </div>
      <div class="small">Made with care · Single-file SPA</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import TranslationInput from './components/TranslationInput.vue';
import TranslationOutput from './components/TranslationOutput.vue';
import { useTranslation } from './composables/useTranslation';

interface TranslateEvent {
  text: string;
  targetLanguage: string;
}

const { translateText, isTranslating, status } = useTranslation();

const inputText = ref<string>('');
const outputText = ref<string>('');
const targetLang = ref<string>('en');

const handleTranslate = async ({ text, targetLanguage }: TranslateEvent): Promise<void> => {
  targetLang.value = targetLanguage;
  const result = await translateText(text, targetLanguage);
  outputText.value = result || '—';
};

const handleSwap = (text: string): void => {
  const currentInput = inputText.value;
  inputText.value = outputText.value === '—' ? '' : outputText.value;
  outputText.value = currentInput || '—';
};

// Focus input on load for better accessibility
onMounted(() => {
  document.getElementById('input')?.focus();
});
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 980px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(2, 6, 23, 0.7);
}

header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.logo {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), #4ec5c7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #071025;
}

h1 {
  font-size: 18px;
  margin: 0;
}

.subtitle {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 14px;
}

footer {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.small {
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 820px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>