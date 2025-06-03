import { InputText } from '@/components/InputText'
import { NavBar } from '@/components/NavBar'
import { Picker } from '@react-native-picker/picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Button, HStack, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Book, BookStatus, useBookDatabase } from '../../hooks/useBookDatabase'
import { User, useUserDatabase } from '../../hooks/useUserDatabase'

export default function BookDetails() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const { id } = useLocalSearchParams<{ id: string }>()
  const { show, updateBook, updateBookStatus, remove } = useBookDatabase()
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
      const allUsers = await list()
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

  async function handleDelete() {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente deletar este livro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            await remove(Number(id))
            router.replace("/")
          },
        },
      ]
    )
  }

  return (
    <>
      <VStack style={styles.container} >
        <VStack >
          <Text style={styles.title}>Informações do Livro</Text>
          <InputText
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
          />
          <InputText
            placeholder="Autor"
            value={author}
            onChangeText={setAuthor}
          />
        </VStack>
        <HStack justifyContent={"space-between"} w={"100%"}>

          <Button w={"40%"} onPress={handleUpdate} colorScheme="blue" >
            Atualizar
          </Button>
          <Button w={"40%"} colorScheme="danger" onPress={handleDelete}>
            Deletar
          </Button>
        </HStack>

        <View style={{ height: 16 }} />
        <Text style={{ marginTop: 20 }}>Reservado para:</Text>
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
          onPress={handleReservation}
          colorScheme="green"
        >
          <Text>Confirmar Reserva</Text>
        </Button>
      </VStack>
      <NavBar />
    </>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: 'white' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 10,
  },
})
