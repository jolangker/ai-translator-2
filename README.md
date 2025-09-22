# AI Translator

A modern TypeScript-based Vue 3 application that provides real-time language translation capabilities with an accessible and responsive user interface.

## Features

- 🌐 Real-time language detection and translation
- 🎯 TypeScript for enhanced type safety and developer experience
- 🗣️ Text-to-speech functionality with browser Speech Synthesis
- 📋 One-click copy to clipboard
- 📱 Responsive design for all device sizes
- ♿ Comprehensive accessibility features including ARIA labels
- ⚡ Built with Vite for optimal development experience

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technical Stack

- **Framework**: Vue 3.5+ with Composition API
- **Language**: TypeScript 5.9+
- **Build Tool**: Vite 4.4+
- **Development Tools**:
  - ESLint with Vue recommended rules
  - Prettier for consistent code formatting
  - TypeScript strict mode enabled

## Architecture

The application follows a component-based architecture with TypeScript:

```
src/
├── components/
│   ├── TranslationInput.vue  # Input handling & language detection
│   └── TranslationOutput.vue # Translation display & accessibility
├── composables/
│   └── useTranslation.ts    # Core translation logic
├── types/
│   └── translation.ts       # TypeScript type definitions
└── App.vue                  # Main application orchestration
```

### Key Components

- **TranslationInput**: Manages text input and language selection with real-time detection
- **TranslationOutput**: Handles translation display with accessibility features
- **useTranslation**: Composable hook for translation logic and API integration

## Environment Configuration

The application requires an API endpoint configuration:

```env
VITE_TRANSLATOR_API_URL=your_api_endpoint
```

## Development

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) with:
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (Vue 3 support)
  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

### Code Quality

```bash
# Run linting
npm run lint
```

The project enforces code quality through:
- TypeScript strict mode
- ESLint with Vue recommended rules
- Prettier for consistent formatting

## Production Deployment

### Pre-deployment Checklist

1. Configure `VITE_TRANSLATOR_API_URL` with your production API endpoint
2. Implement rate limiting and error handling
3. Set up monitoring and error tracking
4. Consider implementing translation caching
5. Test accessibility features
6. Verify browser compatibility

### Performance Considerations

- Translation requests are debounced for optimal API usage
- Speech synthesis utilizes native browser capabilities
- Static assets are optimized during build

## License

MIT