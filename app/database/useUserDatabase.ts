import { useSQLiteContext } from "expo-sqlite"

export type User = {
  id?: number
  name: string
  email: string
}

export function useUserDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<User, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO users (name, email) VALUES ($name, $email)"
    )

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $email: data.email,
      })


      return { $name: data.name, $email: data.email }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM users WHERE name LIKE ?"

      const response = await database.getAllAsync<User>(
        query,
        `%${name}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  async function update(data: User) {
    const statement = await database.prepareAsync(
      "UPDATE users SET name = $name, email = $email WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: Number(data.id),
        $name: data.name,
        $email: data.email,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM users WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM users WHERE id = ?"

      const response = await database.getFirstAsync<User>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  return { create, searchByName, update, remove, show }
}
