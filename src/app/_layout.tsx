import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {SQLiteProvider, useSQLiteContext} from 'expo-sqlite'
import {useState, useEffect, useCallback} from 'react'
import {PaperProvider} from 'react-native-paper'
import type {SQLiteDatabase} from 'expo-sqlite'
import {StatusBar} from 'expo-status-bar'
import {Stack} from 'expo-router'

import {
	ThemeContext,
	type ThemeMode,
	getTheme,
	getColors,
	useThemeContext,
} from '@/constants/themes'

async function initDatabase(db: SQLiteDatabase): Promise<void> {
	await db.execAsync(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_term TEXT NOT NULL,
      analogy TEXT NOT NULL,
      language TEXT NOT NULL,
      category TEXT,
      timestamp INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS custom_skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      aliases TEXT,
      category TEXT NOT NULL DEFAULT 'custom',
      what_it_is TEXT NOT NULL,
      analogy TEXT NOT NULL,
      key_traits TEXT,
      common_comparisons TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skill_overrides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      term_name TEXT NOT NULL UNIQUE,
      enabled INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_term TEXT NOT NULL,
      analogy TEXT NOT NULL,
      language TEXT NOT NULL,
      category TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_preferences (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `)
}

function ThemeProvider({children}: {children: React.ReactNode}) {
	const db = useSQLiteContext()
	const [mode, setMode] = useState<ThemeMode>('dark')

	useEffect(() => {
		const loadTheme = async () => {
			try {
				const result = await db.getFirstAsync<{value: string}>(
					"SELECT value FROM user_preferences WHERE key = 'theme_mode'",
				)
				if (result?.value === 'light' || result?.value === 'dark') {
					setMode(result.value)
				}
			} catch (error) {
				console.error('Failed to load theme preference:', error)
			}
		}
		loadTheme()
	}, [db])

	const toggleTheme = useCallback(async () => {
		const newMode = mode === 'dark' ? 'light' : 'dark'
		setMode(newMode)
		try {
			await db.runAsync(
				'INSERT OR REPLACE INTO user_preferences (key, value) VALUES (?, ?)',
				['theme_mode', newMode],
			)
		} catch (error) {
			console.error('Failed to save theme preference:', error)
		}
	}, [mode, db])

	const theme = getTheme(mode)
	const colors = getColors(mode)

	return (
		<ThemeContext.Provider value={{mode, theme, colors, toggleTheme}}>
			{children}
		</ThemeContext.Provider>
	)
}

function RootLayoutInner() {
	const {theme} = useThemeContext()

	return (
		<PaperProvider theme={theme}>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: {backgroundColor: theme.colors.background},
				}}
			>
				<Stack.Screen
					name="(tabs)"
					options={{headerShown: false}}
				/>
			</Stack>
			<StatusBar style={theme.dark ? 'light' : 'dark'} />
		</PaperProvider>
	)
}

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<SafeAreaProvider>
				<SQLiteProvider
					databaseName="noobify.db"
					onInit={initDatabase}
				>
					<ThemeProvider>
						<RootLayoutInner />
					</ThemeProvider>
				</SQLiteProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)
}
