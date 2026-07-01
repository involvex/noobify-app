import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { haloColors } from '@/constants/haloTheme';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    index: focused ? '✨' : '💡',
    history: focused ? '📜' : '📋',
  };

  return (
    <View
      style={{
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ fontSize: 18 }}>{icons[name] || '•'}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: haloColors.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: haloColors.border,
        },
        headerTitleStyle: {
          color: haloColors.onSurface,
          fontFamily: 'System',
          fontSize: 18,
          fontWeight: '600' as const,
          letterSpacing: -0.01,
        },
        tabBarStyle: {
          backgroundColor: haloColors.surface,
          borderTopWidth: 1,
          borderTopColor: haloColors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: haloColors.primary,
        tabBarInactiveTintColor: haloColors.onSurfaceMuted,
        tabBarLabelStyle: {
          fontFamily: 'System',
          fontSize: 12,
          fontWeight: '500' as const,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Noobify',
          headerTitle: 'Noobify',
          tabBarLabel: 'Translator',
          tabBarIcon: ({ focused }) => <TabIcon name="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerTitle: 'History',
          tabBarLabel: 'History',
          tabBarIcon: ({ focused }) => <TabIcon name="history" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
