import * as FileSystem from 'expo-file-system'

export async function resetDatabase() {
  const dbPath = `${FileSystem.documentDirectory}SQLite/myDatabase.db`

  const exists = await FileSystem.getInfoAsync(dbPath)
  if (exists.exists) {
    await FileSystem.deleteAsync(dbPath)
    console.log("Banco deletado com sucesso.")
  } else {
    console.log("Banco não encontrado.")
  }
}
