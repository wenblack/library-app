import { useSQLiteContext } from "expo-sqlite"

export type Book = {
  id?: number
  title: string
  author: string
  status: 'available'
  user_id?: number | null
}

export function useBookDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<Book, "id" | "user_id" | "status">) {
    const statement = await database.prepareAsync(
      "INSERT INTO books (title, author, status) VALUES ($title, $author, 'available')"
    )

    try {
      const result = await statement.executeAsync({
        $title: data.title,
        $author: data.author,
      })


      return { result }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function searchByTitle(title: string) {
    try {
      const query = "SELECT * FROM books WHERE title LIKE ?"

      const response = await database.getAllAsync<Book>(
        query,
        `%${title}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  async function updateBook(data: Book) {
    const statement = await database.prepareAsync(
      "UPDATE books SET title = $title, author = $author WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: Number(data.id),
        $title: data.title,
        $author: data.author,
        $status: data.status,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM books WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM books WHERE id = ?"

      const response = await database.getFirstAsync<Book>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  return { create, searchByTitle, updateBook, remove, show }
}
