# AI Translator - Essential Knowledge for AI Agents

## Architecture Overview
- Single-page Vue 3 application using Composition API with TypeScript
- Component hierarchy:
  ```
  App.vue (state orchestration)
  ├── TranslationInput.vue (input + language detection)
  └── TranslationOutput.vue (display + accessibility)
  ```
- State management via props/emits pattern with single source of truth in App.vue
- API integration via Cloudflare Worker endpoint (environment variable configuration)
- Responsive design with mobile-first approach (breakpoint at 820px)

## Critical Data Flows
1. **Translation Flow**
   ```typescript
   // Input -> API -> Output
   TranslationInput.vue     useTranslation.ts     App.vue  
   @translate ---------------> translateText() -----> outputText.value
   (text, target)            POST to API          update display
                            Return translated text
   ```

2. **Component Communication**
   ```typescript
   // Two-way binding with modelValue
   <translation-input
     v-model="inputText"    // Parent state
     @translate="handleTranslate"
   />
   ```

3. **Text-to-Speech Flow**
   ```typescript
   // Output -> Browser Speech API
   TranslationOutput.vue     useTranslation.ts
   speakOutput() -----------> speechSynthesis.speak()
                             lang = targetLang
   ```

## Essential Knowledge
1. **API Integration**
   - API URL configured via VITE_TRANSLATOR_API_URL environment variable
   - POST requests with text + target language
   - Error states and loading handled via reactive refs (status, isTranslating)
   - Simple string response format for translations

2. **State Management**
   ```typescript
   // Core pattern: status-first updates
   setStatus('translating...'); // 1. Update UI state
   isTranslating.value = true;  // 2. Set loading
   const result = await api();  // 3. API call
   setStatus('done');          // 4. Reset state
   ```

3. **Key Files**
   - `src/types/translation.ts`: API type definitions 
   - `src/composables/useTranslation.ts`: Core translation logic
   - `.env`: API configuration

## Development Workflow
1. **Setup**: 
   ```bash
   npm install     # Install dependencies
   npm run dev     # Start dev server on port 3000
   npm run lint    # Run ESLint + Prettier
   npm run build   # Build for production
   ```

2. **Environment**: Copy `.env.example` and configure VITE_TRANSLATOR_API_URL

3. **Code Standards**:
   - ESLint with Vue3 recommended rules
   - Prettier with 100 char line length
   - TypeScript strict mode enabled

## Project Patterns
1. **Accessibility First**:
   ```vue
   <!-- Required pattern for all interactive sections -->
   <section aria-labelledby="unique-id">
     <label id="unique-id">Label</label>
     <div aria-live="polite">{{ dynamicContent }}</div>
   </section>
   ```

2. **Browser APIs**:
   ```typescript
   // Speech synthesis with fallback
   if ('speechSynthesis' in window) {
     const utter = new SpeechSynthesisUtterance(text);
     utter.lang = targetLang;
     speechSynthesis.speak(utter);
   } else {
     alert('Speech synthesis not supported');
   }
   ```

3. **Error Handling**:
   ```typescript
   try {
     // API calls
   } catch (e) {
     console.warn(e);          // Log for debugging
     setStatus('error state'); // Update UI
     return '';                // Fail gracefully
   }
   ```

## Common Tasks
1. **Add New Language**:
   ```typescript
   // TranslationInput.vue
   const targetLanguages = {
     'en': 'English',
     'zh': 'Chinese'
     // Add new language here
   };
   ```

2. **Modify API Integration**:
   ```typescript
   // useTranslation.ts
   const API_URL = import.meta.env.VITE_TRANSLATOR_API_URL;
   const payload: TranslationPayload = { text, targetLanguage };
   const res = await fetch(API_URL, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(payload)
   });
   ```

## Key Concepts
- Accessibility as core requirement - all UI changes maintain ARIA patterns
- Environment-based configuration for API endpoints 
- TypeScript for type safety across API boundaries
- CSS variables for theming (`--bg`, `--card`, `--muted`, `--accent`)
- Mobile-first responsive design with flexbox/grid