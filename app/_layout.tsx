import { Slot } from "expo-router"
import { SQLiteProvider } from "expo-sqlite"
import { NativeBaseProvider, StatusBar, useColorMode } from "native-base"
import { initializeDatabase } from "../database/initializeDatabase"
export default function Layout() {

  //resetDatabase() for testing purposes
  return (
    <NativeBaseProvider >
      <StatusBarConfig />
      <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
        <Slot />
      </SQLiteProvider>
    </NativeBaseProvider>
  )
}
function StatusBarConfig() {
  const { colorMode } = useColorMode()

  return (
    <StatusBar
      barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
      backgroundColor={colorMode === "dark" ? "#121212" : "#ffffff"}
    />
  )
}
