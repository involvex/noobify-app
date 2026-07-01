# Noobify-App Feature Suggestions

This document outlines potential features and improvements for the Noobify-App, organized by priority and category.

---

## Current Features

- Local AI Translation (Qwen2.5-0.5B via llama.rn)
- Bilingual Support (English/German)
- Simple Analogies for tech terms
- Offline History (SQLite)
- Halo Dark Theme
- Skill System with 140+ tech terms
- Skill Manager (browse, search, toggle, add custom, import/export)
- Context injection into LLM prompts

---

## High Priority Features

### 1. Additional Languages

**Description:** Expand language support beyond English and German.

**Details:**

- Add Spanish (ES), French (FR), Portuguese (PT), Japanese (JA), Chinese (ZH)
- Each language needs: system prompt translation, UI strings, skill context translations
- Consider language-specific analogy styles (e.g., Japanese honorifics for concepts)

**Implementation:**

- Create `Language` type union with all supported languages
- Add language-specific prompt templates in `useLocalLLM.ts`
- Update UI with language selector dropdown or chips

---

### 2. Favorites/Bookmarks

**Description:** Allow users to save their favorite explanations for quick access.

**Details:**

- Add "Favorite" button to generated results
- New `favorites` table in SQLite
- Dedicated Favorites tab or filter in History
- Export favorites as JSON

**Implementation:**

```sql
CREATE TABLE favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  original_term TEXT NOT NULL,
  analogy TEXT NOT NULL,
  language TEXT NOT NULL,
  category TEXT,
  created_at INTEGER NOT NULL
);
```

---

### 3. Search History

**Description:** Add search functionality to the History screen.

**Details:**

- Search bar at top of History screen
- Filter by term name, language, or category
- Real-time search as user types
- Clear search button

**Implementation:**

- Add search state to `HistoryScreen`
- Filter `history` array based on search query
- Consider fuzzy search for better UX

---

### 4. Statistics Dashboard

**Description:** Show usage statistics and insights.

**Details:**

- Total terms explained
- Most common terms
- Language usage breakdown
- Category distribution
- Daily/weekly usage charts

**Implementation:**

- New `stats` table or compute from history
- Simple chart using `react-native-chart-kit` or custom SVG
- Accessible via profile/settings screen

---

## Medium Priority Features

### 5. Voice Input/Output

**Description:** Add speech-to-text for input and text-to-speech for output.

**Details:**

- Use `expo-speech` for TTS
- Use `@react-native-voice/voice` for STT
- Microphone button next to input field
- Speaker button on generated analogy

**Implementation:**

- Add voice permission handling
- Integrate speech recognition
- Add audio playback for analogies

---

### 6. Custom Model Support

**Description:** Allow users to select different LLM models.

**Details:**

- Support multiple GGUF models (0.5B, 1B, 3B)
- Model selection in settings
- Download and manage models
- Show model size and capabilities

**Implementation:**

- Create model registry with metadata
- Add model download management
- Update `useLocalLLM` to handle multiple models

---

### 7. Onboarding Tutorial

**Description:** Guide new users through app features.

**Details:**

- Welcome screen with app overview
- Step-by-step feature highlights
- Skip option for power users
- Show only on first launch

**Implementation:**

- Use `react-native-onboarding-swiper` or custom
- Store completion state in AsyncStorage
- Show tooltips for key features

---

### 8. Dark/Light Theme Toggle

**Description:** Allow users to switch between dark and light themes.

**Details:**

- System theme detection
- Manual toggle in settings
- Persist preference
- Update all components for light theme

**Implementation:**

- Create `lightTheme.ts` with light colors
- Add theme context/provider
- Update `haloTheme.ts` to export both themes

---

### 9. Export/Share Improvements

**Description:** Enhance sharing capabilities.

**Details:**

- Export as PDF with styling
- Share as image (card format)
- Copy to clipboard
- Share multiple items at once
- Social media templates

**Implementation:**

- Use `expo-print` for PDF generation
- Use `react-native-view-shot` for image capture
- Add batch selection in History

---

### 10. Gamification Elements

**Description:** Make learning more engaging with gamification.

**Details:**

- Learning streaks (daily term explanations)
- Badges for milestones (10, 50, 100 terms)
- Achievement system
- Progress tracking

**Implementation:**

- Store streak data in SQLite
- Create badge component
- Add achievements screen

---

## Low Priority Features

### 11. Widget Support

**Description:** Add home screen widgets for quick access.

**Details:**

- "Word of the day" widget
- Quick search widget
- Recent terms widget
- iOS and Android support

**Implementation:**

- Use `expo-widget` or native module
- Create widget configurations
- Handle widget updates

---

### 12. Cloud Sync

**Description:** Sync data across devices.

**Details:**

- Optional cloud backup
- Sync favorites and custom skills
- Conflict resolution
- Privacy-focused (end-to-end encryption)

**Implementation:**

- Use Firebase or Supabase
- Add sync toggle in settings
- Handle offline/online state

---

### 13. Social Features

**Description:** Add community aspects.

**Details:**

- Share custom skills publicly
- Rate and review analogies
- Community skill packs
- Leaderboards for contributors

**Implementation:**

- Create API for skill sharing
- Add rating system
- Build community screen

---

### 14. Accessibility Enhancements

**Description:** Improve accessibility for all users.

**Details:**

- Screen reader optimization
- Dynamic font scaling
- High contrast mode
- Haptic feedback
- Keyboard navigation

**Implementation:**

- Add accessibility labels
- Use `AccessibilityInfo` API
- Test with TalkBack/VoiceOver

---

### 15. Performance Optimizations

**Description:** Improve app performance.

**Details:**

- Lazy load screens
- Optimize image assets
- Reduce bundle size
- Cache frequently used data
- Optimize LLM inference

**Implementation:**

- Use `React.lazy` for code splitting
- Implement virtual lists for large datasets
- Profile and optimize hot paths

---

## Technical Improvements

### 16. Testing Suite

**Description:** Add comprehensive testing.

**Details:**

- Unit tests for hooks and utilities
- Component tests with React Native Testing Library
- E2E tests with Detox
- Integration tests for SQLite operations

**Implementation:**

- Set up Jest configuration
- Create test utilities
- Add CI/CD pipeline

---

### 17. Documentation

**Description:** Improve project documentation.

**Details:**

- API documentation
- Component storybook
- Contributing guidelines
- Architecture decisions

**Implementation:**

- Use Storybook for components
- Add JSDoc comments
- Create docs folder

---

### 18. CI/CD Pipeline

**Description:** Automate builds and testing.

**Details:**

- GitHub Actions for testing
- Automated APK builds
- Release management
- Code quality checks

**Implementation:**

- Create workflow files
- Add test automation
- Set up release process

---

### 19. Error Tracking

**Description:** Add error monitoring and reporting.

**Details:**

- Crash reporting
- Performance monitoring
- User feedback submission
- Error analytics

**Implementation:**

- Use Sentry or Bugsnag
- Add error boundaries
- Create feedback form

---

### 20. Internationalization (i18n)

**Description:** Proper internationalization framework.

**Details:**

- Extract all strings to translation files
- Support RTL languages
- Date/time localization
- Number formatting

**Implementation:**

- Use `i18next` or `react-intl`
- Create translation files
- Add language switcher

---

## Implementation Priority Matrix

| Feature              | Impact | Effort | Priority |
| -------------------- | ------ | ------ | -------- |
| Additional Languages | High   | Medium | P0       |
| Favorites/Bookmarks  | High   | Low    | P0       |
| Search History       | Medium | Low    | P0       |
| Statistics Dashboard | Medium | Medium | P1       |
| Voice Input/Output   | High   | High   | P1       |
| Custom Model Support | Medium | High   | P1       |
| Onboarding Tutorial  | Medium | Medium | P1       |
| Dark/Light Theme     | Medium | Medium | P2       |
| Export Improvements  | Medium | Medium | P2       |
| Gamification         | Low    | Medium | P2       |
| Widget Support       | Low    | High   | P3       |
| Cloud Sync           | High   | High   | P3       |
| Social Features      | Medium | High   | P3       |
| Accessibility        | High   | Medium | P2       |
| Performance          | Medium | Medium | P2       |
| Testing Suite        | High   | High   | P1       |
| Documentation        | Medium | Low    | P1       |
| CI/CD Pipeline       | High   | Medium | P1       |
| Error Tracking       | High   | Medium | P2       |
| i18n Framework       | Medium | Medium | P2       |

---

## Quick Wins (Can be implemented in < 1 day)

1. **Search History** - Simple filter implementation
2. **Favorites** - Add button + SQLite table
3. **Documentation** - JSDoc comments
4. **Error Boundaries** - Add React error boundaries
5. **Accessibility Labels** - Add basic a11y props

---

## Future Considerations

- **AR Features** - Point camera at code to get explanations
- **Browser Extension** - Explain terms on web pages
- **Desktop App** - Electron or Tauri version
- **API Access** - Expose functionality via REST API
- **Plugin System** - Allow third-party skill packs

---

_Last updated: July 2026_
