import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
  `)

  await database.execAsync(`
       CREATE TABLE IF NOT EXISTS books(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         title TEXT NOT NULL,
         author TEXT NOT NULL,
         status TEXT NOT NULL CHECK(status IN('available', 'in use')),
         user_id INTEGER,
         FOREIGN KEY(user_id) REFERENCES users(id)
       );
  `)
}
