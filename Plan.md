# Noobify-App

### Key Architectural Updates Based on 2026 Standards:

1. **Model Management**: We will use `expo-file-system` to download and store the `.gguf` file locally so we don't bloat the APK.
2. **Offline Data**: We will use Expo's native `expo-sqlite` (which had a major upgrade recently) to store history, completely avoiding the headaches of MMKV.
3. **UI Engine**: `react-native-paper` fully supports Material Design 3 and meshes beautifully with Expo Router's file-based navigation.
4. **Pre-built C++**: We will tell Bun to trust `llama.rn`, which allows it to download the *pre-built* native files. This means your local APK build will take minutes, not hours.

---

## 1. The Local Build Workflow (Terminal)

Because you want this 100% free and don't want EAS limits, you'll compile the APK on your own machine. After the agent builds the code, run these commands:

1. `bun install` (This creates `bun.lock` and pulls the pre-built `llama.rn` binaries).
2. `bunx expo prebuild --platform android --clean` (Generates the native Android folder).
3. `cd android && ./gradlew assembleRelease` (Compiles the APK).
4. Drag and drop `android/app/build/outputs/apk/release/app-release.apk` to your Poco phone!

---

## 2. The Master Agent Prompt

Copy this exact block and paste it into your AI coding assistant:

```text
You are an expert React Native and Expo developer. Your task is to scaffold "Noobify-App", a local-first AI translation utility that explains complex technical terms using simple, everyday analogies.

Tech Stack & Constraints:
- Framework: Expo (New Architecture) with Expo Router (SDK 54+).
- Package Manager: Strict use of `bun`. Do NOT use npm or yarn.
- Local AI Engine: `llama.rn`. Target Model: `Qwen2.5-0.5B-Instruct-Q4_K_M.gguf`.
- UI System: `react-native-paper` (Material 3 Dark Theme enabled).
- Database: `expo-sqlite` (for offline History).
- Build System: Local Android Gradle build. Do NOT generate `eas.json` or configure EAS.
- Name the app: "Noobify-App" in `app.json`.

Critical Setup Requirements (Execute step-by-step):
1. Initialize: Run `bun create expo noobify-app --template default` to set up the Expo Router environment.
2. Dependencies: Run `bun add llama.rn react-native-paper expo-sqlite expo-file-system`.
3. Package.json: Manually add `"trustedDependencies": ["llama.rn"]` to `package.json` and run `bun install` again so Bun executes the post-install script to download the prebuilt C++ binaries.
4. Config Plugin: In `app.json`, add the plugin: `["llama.rn", { "forceCxx20": true, "enableOpenCL": true }]`.

Core Implementation:
1. The UI (Material 3 Dark Terminal Aesthetic):
   - Backgrounds: `#121212`. Fonts: Monospaced for inputs.
   - Use Expo Router with `(tabs)`: an Index screen (Translator) and a History screen.
   - Index Screen: Include a top language toggle chip (English/German), a Material `TextInput`, a "Noobify" Submit Button, and an Output Card displaying the analogy with a native React Native `Share` button.

2. The AI Hook (`useLocalLLM`):
   - Write a helper using `expo-file-system` to check if `qwen2.5-0.5b-instruct-q4_k_m.gguf` exists in `FileSystem.documentDirectory`. If not, download it from Hugging Face (`https://huggingface.co/bartowski/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/Qwen2.5-0.5B-Instruct-Q4_K_M.gguf`). Add a visual downloading progress state.
   - Initialize `initLlama` with: `n_ctx: 1024` and `n_gpu_layers: 0` (this ensures rock-solid stability on MediaTek CPUs).
   - Inject a System Prompt depending on the language toggle (EN/DE): "You are a witty translator for beginners. Explain the user's tech term using an everyday analogy (e.g. cooking, cars). Keep it under 60 words."

3. The Database (`expo-sqlite`):
   - Initialize an SQLite DB using `SQLiteProvider` in the root layout.
   - Create a `history` table (id, original_term, analogy, language, timestamp).
   - Automatically save successfully generated analogies to this DB.
   - Wire the History Tab to read from this DB, displaying past analogies in a fast, scrollable list.

## References

- https://github.com/mybigday/llama.rn