<template>
  <section class="card" aria-labelledby="output-title">
    <label id="output-title">Output</label>
    <div class="output" aria-live="polite">{{ modelValue || '—' }}</div>

    <div class="controls" style="margin-top:10px">
      <button
        class="btn"
        @click="copyOutput"
        :disabled="!hasOutput"
      >
        Copy
      </button>
      <button
        class="btn"
        @click="speakOutput"
        :disabled="!hasOutput"
      >
        Speak
      </button>
      <div style="flex:1"></div>
      <div class="muted">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTranslation } from '../composables/useTranslation';

const props = defineProps<{
  modelValue: string
  targetLang: string
  status: string
}>();

const { copyToClipboard, speakText } = useTranslation();

const hasOutput = computed((): boolean => {
  return Boolean(props.modelValue && props.modelValue !== '—');
});

const copyOutput = () => {
  if (hasOutput.value) {
    copyToClipboard(props.modelValue);
  }
};

const speakOutput = () => {
  if (hasOutput.value) {
    speakText(props.modelValue, props.targetLang);
  }
};
</script>