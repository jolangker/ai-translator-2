<template>
  <section class="card" aria-labelledby="input-title">
    <label id="input-title">Input text</label>
    <textarea
      id="input"
      v-model="inputText"
      placeholder="Type or paste text here..."
      aria-label="input text"
    ></textarea>

    <div class="controls">
      <button class="btn" @click="clearInput">Clear</button>
    </div>

    <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
      <label class="muted">Target</label>
      <select
        v-model="selectedTarget"
        aria-label="Select target language"
      >
        <option
          v-for="(name, code) in targetLanguages"
          :key="code"
          :value="code"
        >
          {{ name }}
        </option>
      </select>
    </div>

    <div class="controls" style="margin-top:8px">
      <button
        class="btn primary"
        :disabled="isTranslating || !inputText.trim()"
        @click="translate"
      >
        {{ translateButtonText }}
      </button>
      <button
        class="btn"
        @click="$emit('swap', inputText)"
      >
        Swap (input↔output)
      </button>
      <div style="flex:1"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  modelValue: string
  isTranslating: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'swap', text: string): void
  (e: 'translate', payload: { text: string; targetLanguage: string }): void
}>();

const inputText = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
});

const selectedTarget = ref('en');

// Simplified language options since language detection is handled by AI
const targetLanguages = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese'
};

const translateButtonText = computed(() => {
  return props.isTranslating ? 'Translating...' : 'Translate';
});

const clearInput = () => {
  inputText.value = '';
};

const translate = () => {
  if (!inputText.value.trim()) {
    alert('Please enter some text to translate.');
    return;
  }
  emit('translate', {
    text: inputText.value,
    targetLanguage: selectedTarget.value
  });
};
</script>