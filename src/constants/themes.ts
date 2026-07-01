import type {MD3Theme} from 'react-native-paper'
import {createContext, useContext} from 'react'

import {lightTheme, lightColors} from './lightTheme'
import {haloTheme, haloColors} from './haloTheme'

export type ThemeMode = 'dark' | 'light'

export interface ThemeContextType {
	mode: ThemeMode
	theme: MD3Theme
	colors: typeof haloColors
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
	mode: 'dark',
	theme: haloTheme,
	colors: haloColors,
	toggleTheme: () => {},
})

export function getTheme(mode: ThemeMode): MD3Theme {
	return mode === 'dark' ? haloTheme : lightTheme
}

export function getColors(mode: ThemeMode): typeof haloColors {
	return mode === 'dark' ? haloColors : lightColors
}

export const useThemeContext = () => useContext(ThemeContext)
