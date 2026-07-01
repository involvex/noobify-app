# AGENTS.md - Noobify-App Development Guide

## Project Overview

**Noobify-App** is a local-first AI translation utility that explains complex technical terms using simple, everyday analogies. The app runs entirely on-device using a small language model (Qwen2.5-0.5B) via llama.rn, with no server dependency after initial model download.

### Key Features
- **Local AI Translation** - Uses Qwen2.5-0.5B-Instruct model running on-device via llama.rn
- **Bilingual Support** - Translates between English and German with contextual explanations
- **Simple Analogies** - Tech terms explained using everyday concepts (cooking, cars, etc.)
- **Offline History** - All translations stored locally using SQLite
- **Halo Dark Theme** - Beautiful dark UI with the Halo color palette

---

## Technologies

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| Expo SDK | 57 | React Native development platform |
| React Native | 0.86.0 | Mobile app framework |
| React | 19.2.3 | UI library |
| TypeScript | 6.0.3 | Type-safe JavaScript |
| Bun | >= 1.3.0 | Package manager (required, do NOT use npm/yarn/pnpm) |

### Key Libraries

| Library | Purpose |
|---------|---------|
| `llama.rn` | Local LLM inference engine (Qwen2.5-0.5B model) |
| `expo-router` | File-based navigation system |
| `react-native-paper` | Material Design 3 UI components |
| `expo-sqlite` | Local SQLite database for history |
| `expo-file-system` | File operations and model download |
| `react-native-reanimated` | Animations |
| `react-native-gesture-handler` | Gesture handling |
| `react-native-safe-area-context` | Safe area insets |

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting (v10) |
| Prettier | Code formatting (v3) |
| TypeScript | Static type checking |

---

## Useful Commands

### Development

```bash
# Install dependencies
bun install

# Start development server
bun run start

# Run on Android device/emulator
bun run android

# Run on iOS simulator (macOS only)
bun run ios

# Run on web browser
bun run web
```

### Code Quality

```bash
# Run ESLint + Prettier checks
bun run lint

# Auto-fix linting issues
bun run lint:fix

# Format all files with Prettier
bun run format

# TypeScript type checking
bun run typecheck

# Full health check (lint + format + dependency check + typecheck)
bun run check
```

### Building

```bash
# Generate Android native project
bunx expo prebuild --platform android

# Clean and regenerate native project
bunx expo prebuild --clean --platform android

# Build release APK
cd android && ./gradlew assembleRelease

# Build debug APK
cd android && ./gradlew assembleDebug
```

### Utilities

```bash
# Reset project to initial state
bun run reset-project
```

---

## Project Structure

```
noobify-app/
  src/
    app/                    # Expo Router screens (file-based routing)
      _layout.tsx           # Root layout (SQLite + Paper providers)
      (tabs)/
        _layout.tsx         # Tab navigation layout
        index.tsx           # Translator screen (main screen)
        history.tsx         # History screen
    components/             # Reusable React components
    constants/
      haloTheme.ts          # Halo dark theme tokens and colors
    hooks/
      useLocalLLM.ts        # LLM initialization and text generation
      useDatabase.ts        # SQLite history operations
  android/                  # Generated Android native project (gitignored)
  assets/
    images/                 # App icons and splash screens
  scripts/                  # Build and utility scripts
  app.json                  # Expo configuration
  metro.config.js           # Metro bundler configuration
  tsconfig.json             # TypeScript configuration
  eslint.config.mjs         # ESLint configuration
  .prettierrc               # Prettier configuration
  package.json
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:
- `@/*` maps to `./src/*`
- `@/assets/*` maps to `./assets/*`

Example usage:

```typescript
import { haloColors } from '@/constants/haloTheme';
import { useLocalLLM } from '@/hooks/useLocalLLM';
```

### Styling

#### Halo Theme Colors

Always use the exported theme tokens from `@/constants/haloTheme`:

| Token | Hex | Usage |
|-------|-----|-------|
| `haloColors.background` | `#0A0B0F` | App background |
| `haloColors.surface` | `#14151C` | Cards, dialogs |
| `haloColors.elevated` | `#1E2029` | Elevated surfaces |
| `haloColors.border` | `#2A2D38` | Default border |
| `haloColors.borderStrong` | `#3A3D4A` | Strong border |
| `haloColors.onSurface` | `#F2F4F8` | Primary text |
| `haloColors.onSurfaceMuted` | `#9AA0AE` | Secondary text |
| `haloColors.onSurfaceFaint` | `#5C6170` | Tertiary text |
| `haloColors.primary` | `#5B6BFF` | Primary accent |
| `haloColors.primaryHover` | `#7886FF` | Primary hover state |
| `haloColors.primaryPressed` | `#4A59E6` | Primary pressed state |
| `haloColors.secondary` | `#3DD7E5` | Secondary accent |
| `haloColors.tertiary` | `#F5D547` | Tertiary accent |
| `haloColors.error` | `#FF3A5C` | Error state |
| `haloColors.success` | `#2BE08C` | Success state |
| `haloColors.warning` | `#F5D547` | Warning state |
| `haloColors.info` | `#3DD7E5` | Info state |

#### StyleSheet Patterns

- Border radius: 16 for cards, 10 for buttons, 8 for inputs
- Font sizes: 28 title, 16 body, 14 subtitle, 12 caption
- Always use `StyleSheet.create` for performance
- Never use inline style objects

---

## Best Practices

### Code Style

#### TypeScript
- **Always use TypeScript** - No plain JavaScript files
- **Strict mode enabled** - All type errors must be resolved
- **Avoid `any` types** - Use proper type definitions (warns on `@typescript-eslint/no-explicit-any`)
- **Prefix unused variables with `_`** - To suppress unused variable warnings

#### React Native Components
- **Functional components only** - No class components
- **Use hooks for state** - `useState`, `useCallback`, `useEffect`, `useRef`
- **Memoize callbacks** - Use `useCallback` for functions passed as props
- **Use StyleSheet.create** - For all styles (never inline objects for performance)
- **Component file naming** - PascalCase for components (e.g., `LanguageToggle.tsx`)

#### Imports
- **Use path aliases** - `@/` prefix for src imports
- **Group imports** - React/React Native first, then third-party, then local
- **Destructure imports** - When importing multiple items from same module

Example:

```typescript
import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

import { haloColors } from '@/constants/haloTheme';
import { useLocalLLM } from '@/hooks/useLocalLLM';
```

### State Management

#### Local State
- Use `useState` for simple component state
- Use `useRef` for mutable values that do not trigger re-renders
- Keep state as close to where it is used as possible

#### Custom Hooks
- Encapsulate complex logic in custom hooks (e.g., `useLocalLLM`, `useDatabase`)
- Return state and actions from hooks
- Handle loading and error states within hooks

---

## Guidelines

### Error Handling
- Always wrap async operations in try-catch blocks
- Use typed error messages for better debugging
- Display user-friendly error messages in the UI
- Provide retry mechanisms for network/model operations

### Performance
- Use `useMemo` for expensive computations
- Use `useCallback` for functions passed as child components
- Avoid unnecessary re-renders by keeping state minimal
- Use `StyleSheet.create` instead of inline styles

### Localization
- All user-facing strings should support both English and German
- Use conditional rendering based on the `language` state
- Keep language toggle state in the main component

### Accessibility
- Use semantic component names and roles
- Ensure sufficient color contrast for text readability
- Support dynamic font scaling
