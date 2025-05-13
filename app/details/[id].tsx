import { Picker } from '@react-native-picker/picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Book, BookStatus, useBookDatabase } from '../database/useBookDatabase'
import { User, useUserDatabase } from '../database/useUserDatabase'

export default function BookDetails() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const { id } = useLocalSearchParams<{ id: string }>()
  const { show, updateBook, updateBookStatus } = useBookDatabase()
  const router = useRouter()
  const { list } = useUserDatabase()

  const [book, setBook] = useState<Book | null>(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    async function loadBookAndUsers() {
      const data = await show(Number(id))
      if (data) {
        setBook(data)
        setTitle(data.title)
        setAuthor(data.author)
        setSelectedUser(data.user_id ?? null)
      }
      const allUsers = await list() // carrega todos
      setUsers(allUsers)
    }

    loadBookAndUsers()

  }, [])

  async function handleUpdate() {
    if (!book) return
    await updateBook({ id: book.id, title, author, status: book.status })
    Alert.alert('Livro atualizado!')
    router.back()
  }

  async function handleReservation() {
    if (!book) return

    try {
      const newStatus = selectedUser ? BookStatus.IN_USE : BookStatus.AVAILABLE
      const newUserId = selectedUser || null

      await updateBookStatus(book.id!, newStatus as "available" | "in_use", newUserId)

      Alert.alert('Sucesso', `Livro ${newStatus === BookStatus.IN_USE ? 'reservado' : 'liberado'} com sucesso!`)
      router.back()
    } catch (error) {
      console.error('Erro ao reservar livro:', error)
      Alert.alert('Erro', 'Não foi possível atualizar o status do livro.')
    }
  }


  //rif (!book) return <Text>Carregando...</Text>

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Detalhes do Livro</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
      />

      <Button title="Salvar Alterações" onPress={handleUpdate} />

      <View style={{ height: 16 }} />
      <Text style={{ marginTop: 20 }}>Reservar para:</Text>
      <Picker
        selectedValue={selectedUser}
        onValueChange={(value) => setSelectedUser(value)}
        style={{ backgroundColor: '#eee', marginVertical: 10 }}
      >
        <Picker.Item label="Nenhum usuário" value={null} />
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.name} value={user.id} />
        ))}
      </Picker>


      <Button
        title="Confirmar Reserva"
        onPress={handleReservation}
        color="green"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', marginTop: 22 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 10,
  },
})
