# Noobify-App

A local-first AI translation utility that explains technical terms using simple, everyday analogies. Built with Expo, llama.rn, react-native-paper, and expo-sqlite.

## Features

- **Local AI Translation** - Uses Qwen2.5-0.5B-Instruct model running entirely on-device via llama.rn
- **Bilingual Support** - Translates between English and German with contextual explanations
- **Simple Analogies** - Tech terms explained using everyday concepts (cooking, cars, etc.)
- **Offline History** - All translations stored locally using SQLite
- **Halo Dark Theme** - Beautiful dark UI with the Halo color palette

## Tech Stack

- [Expo SDK 57](https://expo.dev/) with Expo Router
- [llama.rn](https://github.com/b inherm/llama.rn) for local LLM inference
- [react-native-paper](https://callstack.github.io/react-native-paper/) for UI components
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) for local database
- [Qwen2.5-0.5B-Instruct-Q4_K_M.gguf](https://huggingface.co/bartowski/Qwen2.5-0.5B-Instruct-GGUF) model

## Project Structure

```
noobify-app/
├── src/
│   ├── app/                    # Expo Router screens
│   │   ├── _layout.tsx         # Root layout (SQLite + Paper providers)
│   │   └── (tabs)/
│   │       ├── _layout.tsx     # Tab navigation layout
│   │       ├── index.tsx       # Translator screen
│   │       └── history.tsx     # History screen
│   ├── hooks/
│   │   ├── useLocalLLM.ts      # LLM initialization & text generation
│   │   └── useDatabase.ts      # SQLite history operations
│   └── constants/
│       └── haloTheme.ts        # Halo dark theme tokens
├── android/                    # Generated Android native project
├── assets/images/              # App icons
├── app.json                    # Expo configuration
├── metro.config.js            # Metro bundler config
└── package.json
```

## Setup

### Prerequisites

- Node.js 18+
- [Bun](https://bun.sh/) package manager
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

```bash
# Install dependencies
bun install

# Generate Android native project
npx expo prebuild --platform android

# Run on Android
bun run android
```

### Model Download

On first launch, the app will automatically download the ~400MB Qwen2.5-0.5B-Instruct-Q4_K_M.gguf model from HuggingFace. The model is saved to the app's document directory.

## Configuration

### llama.rn Plugin (app.json)

```json
{
  "plugins": [
    [
      "llama.rn",
      {
        "forceCxx20": true,
        "enableOpenCLAndHexagon": true
      }
    ]
  ]
}
```

### Metro Config

The `metro.config.js` blocks expo-sqlite's web worker files to prevent bundling errors:

```js
blockList: [
  /node_modules\/expo-sqlite\/web\/.*/,
  /node_modules\/wa-sqlite\/.*/,
],
```

## Usage

1. **Enter a tech term** - Type any technical term (API, recursion, blockchain, etc.)
2. **Select language** - Toggle between English and German
3. **Get your analogy** - The AI explains the term using simple, everyday comparisons

### Example

```
Input:  "API"
Output: "Think of an API like a restaurant menu. The kitchen (server) prepares food (data),
         and you (app) just order from the menu without going into the kitchen itself.
         You get your meal without seeing how it was made!"
```

## Build APK

```bash
# Clean prebuild
npx expo prebuild --clean --platform android

# Build release APK
cd android && ./gradlew assembleRelease
```

The APK will be at `android/app/build/outputs/apk/release/`

## Theme Colors (Halo Dark)

| Token          | Hex       | Usage                   |
| -------------- | --------- | ----------------------- |
| Background     | `#0A0B0F` | App background          |
| Surface        | `#141720` | Cards, dialogs          |
| Primary        | `#5B6BFF` | Buttons, links, accents |
| Secondary      | `#8B9FFF` | Secondary actions       |
| Text Primary   | `#FFFFFF` | Main text               |
| Text Secondary | `#A0A6B8` | Subtitles, hints        |

## Development

```bash
# Type check
bun run typecheck

# Lint
bun run lint

# Format
bun run format
```

## Troubleshooting

### Metro bundler shows wa-sqlite.wasm error

This is expected for web bundling. The `metro.config.js` blocks these files for Android/iOS builds. Run the app on a device/emulator instead.

### Model download fails

- Check internet connection
- Ensure sufficient storage space (~400MB)
- The download can be retried from the app's error state

### Build is slow

llama.rn compiles C++ native binaries on first build. Subsequent builds are faster with Gradle cache.

## License

MIT
