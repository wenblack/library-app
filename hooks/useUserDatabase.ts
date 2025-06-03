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

  async function listUsersWithBooksByName(name: string) {
    try {
      const query = `
        SELECT users.*, COUNT(books.id) as book_count
        FROM users
        LEFT JOIN books ON books.user_id = users.id
        WHERE users.name LIKE ?
        GROUP BY users.id
      `

      const response = await database.getAllAsync<any>(query, [`%${name}%`])

      return response.map(user => ({
        ...user,
        book_count: Number(user.book_count)
      }))
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

  async function deleteUserAndFreeBooks(userId: number) {
    const transaction = await database.prepareAsync("BEGIN TRANSACTION")
    try {
      // Liberar os livros
      await database.execAsync(
        "UPDATE books SET status = 'available', user_id = NULL WHERE user_id = " + userId
      )

      // Deletar usuário
      await database.execAsync(
        "DELETE FROM users WHERE id = " + userId
      )

      await database.execAsync("COMMIT")
    } catch (error) {
      await database.execAsync("ROLLBACK")
      throw error
    } finally {
      await transaction.finalizeAsync()
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

  async function list() {
    try {
      const query = "SELECT * FROM users ORDER BY name"

      const response = await database.getAllAsync<User>(query, [])

      return response
    } catch (error) {
      throw error
    }
  }

  return { create, searchByName, update, remove, show, list, listUsersWithBooksByName, deleteUserAndFreeBooks }
}
