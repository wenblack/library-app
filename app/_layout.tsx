import { Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { SQLiteProvider } from "expo-sqlite"
import 'react-native-gesture-handler'
import { initializeDatabase } from "./database/initializeDatabase"

export default function Layout() {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            const icons: Record<string, keyof typeof Feather.glyphMap> = {
              book: 'book',
              user: 'user',
            }

            return <Feather name={icons[route.name] || 'circle'} size={size} color={color} />
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        })}
      />
    </SQLiteProvider>
  )
}
