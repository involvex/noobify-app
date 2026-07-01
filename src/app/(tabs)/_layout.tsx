import {Text, IconButton} from 'react-native-paper'
import {useThemeContext} from '@/constants/themes'
import {View} from 'react-native'
import {Tabs} from 'expo-router'

function TabIcon({name, focused}: {name: string; focused: boolean}) {
	const icons: Record<string, string> = {
		index: focused ? '✨' : '💡',
		history: focused ? '📜' : '📋',
		skills: focused ? '🧠' : '📚',
	}

	return (
		<View
			style={{
				width: 24,
				height: 24,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Text style={{fontSize: 18}}>{icons[name] || '•'}</Text>
		</View>
	)
}

export default function TabLayout() {
	const {mode, toggleTheme, colors} = useThemeContext()

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerStyle: {
					backgroundColor: colors.surface,
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 1,
					borderBottomColor: colors.border,
				},
				headerTitleStyle: {
					color: colors.onSurface,
					fontFamily: 'System',
					fontSize: 18,
					fontWeight: '600' as const,
					letterSpacing: -0.01,
				},
				headerRight: () => (
					<IconButton
						icon={mode === 'dark' ? 'weather-sunny' : 'weather-night'}
						size={24}
						iconColor={colors.onSurfaceMuted}
						onPress={toggleTheme}
						style={{marginRight: 8}}
					/>
				),
				tabBarStyle: {
					backgroundColor: colors.surface,
					borderTopWidth: 1,
					borderTopColor: colors.border,
					height: 64,
					paddingBottom: 8,
					paddingTop: 8,
				},
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.onSurfaceMuted,
				tabBarLabelStyle: {
					fontFamily: 'System',
					fontSize: 12,
					fontWeight: '500' as const,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Noobify',
					headerTitle: 'Noobify',
					tabBarLabel: 'Translator',
					tabBarIcon: ({focused}) => (
						<TabIcon
							name="index"
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: 'History',
					headerTitle: 'History',
					tabBarLabel: 'History',
					tabBarIcon: ({focused}) => (
						<TabIcon
							name="history"
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="skills"
				options={{
					title: 'Skills',
					headerTitle: 'Skill Manager',
					tabBarLabel: 'Skills',
					tabBarIcon: ({focused}) => (
						<TabIcon
							name="skills"
							focused={focused}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
