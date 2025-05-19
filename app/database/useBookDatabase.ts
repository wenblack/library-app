import { useSQLiteContext } from "expo-sqlite"

export type Book = {
  id?: number
  title: string
  author: string
  status: 'available'
  user_id?: number | null
}
export enum BookStatus {
  AVAILABLE = 'available',
  IN_USE = 'in use',
}
export type BookWithUser = Book & { user_name?: string }

export function useBookDatabase() {
  const database = useSQLiteContext()
  async function listWithUser(): Promise<BookWithUser[]> {
    const query = `
      SELECT books.*, users.name AS user_name
      FROM books
      LEFT JOIN users ON users.id = books.user_id
    `
    try {
      const response = await database.getAllAsync<BookWithUser>(query)
      return response
    } catch (error) {
      throw error
    }
  }
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
  async function updateBookStatus(id: number, status: 'available' | 'in_use', userId?: number | null) {
    const statement = await database.prepareAsync(
      "UPDATE books SET status = $status, user_id = $user_id WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $id: id,
        $status: status,
        $user_id: userId ?? null,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  return { create, searchByTitle, updateBook, listWithUser, remove, show, updateBookStatus }
}
