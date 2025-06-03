import { NavBar } from "@/components/NavBar"
import { Ionicons } from "@expo/vector-icons"
import { Button, Divider, HStack, Text, VStack } from "native-base"
import { useEffect, useState } from "react"
import { Alert, FlatList, TextInput } from "react-native"
import { useUserDatabase } from "../hooks/useUserDatabase"



type UserWithBookCount = {
  id: number
  name: string
  book_count: number
}

export default function UsersList() {
  const { listUsersWithBooksByName, update, deleteUserAndFreeBooks } = useUserDatabase()
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<UserWithBookCount[]>([])
  const [filter, setFilter] = useState<"all" | "with_books" | "without_books">("all")
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [editedName, setEditedName] = useState<string>("")

  const handleSearch = async () => {
    const data = await listUsersWithBooksByName(searchTerm)
    applyFilter(data)
  }

  const applyFilter = (data: UserWithBookCount[]) => {
    let filtered = data
    if (filter === "with_books") {
      filtered = data.filter(u => u.book_count > 0)
    } else if (filter === "without_books") {
      filtered = data.filter(u => u.book_count === 0)
    }
    setUsers(filtered)
  }

  const loadUsers = async () => {
    const data = await listUsersWithBooksByName("")
    applyFilter(data)
  }

  useEffect(() => {
    loadUsers()
  }, [filter])

  const handleUpdate = async (userId: number) => {
    await update({
      id: userId, name: editedName,
      email: userId.toString()
    })
    setEditingUserId(null)
    loadUsers()
  }

  async function handleDelete(userId: number) {
    Alert.alert(
      "Confirmar Exclusão",
      "Deseja realmente excluir este usuário? Os livros dele serão liberados.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir", style: "destructive", onPress: async () => {
            Alert.alert("Usuário excluído!")
            await deleteUserAndFreeBooks(userId)
          }
        }
      ]
    )
    setTimeout(() => {
      setFilter("all")
      loadUsers()
    }, 3000)
  }

  return (
    <VStack flex={1} bg={"white"}>
      <VStack safeAreaTop h={"100%"} >
        <VStack px={4}>

          <Text fontSize="2xl" fontWeight="bold" color={'gray.600'} mb={2}>Usuários Cadastrados</Text>
          <HStack alignItems="center" borderWidth={1} borderColor={"gray.400"} borderRadius={16} pl={2} mb={2.5}  >
            <TextInput
              placeholder="Buscar livro"
              placeholderTextColor={"#999"}
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={{ flex: 1, padding: 8, color: "#000" }}
              onSubmitEditing={handleSearch}
            />

            <Button onPress={handleSearch} variant={"ghost"}>
              <Ionicons name="search" size={20} color="gray" />
            </Button>
          </HStack>

          <HStack justifyContent={"space-between"} alignItems={"center"} mb={4} pt={2} >
            <Button px={6}
              fontWeight={filter === "all" ? "bold" : "semibold"}
              rounded={"full"} onPress={() => setFilter("all")} variant={filter === "all" ? "solid" : "outline"}>
              Todos

            </Button>
            <Button px={6}
              fontWeight={filter === "with_books" ? "bold" : "semibold"}
              rounded={"full"} onPress={() => setFilter("with_books")} variant={filter === "with_books" ? "solid" : "outline"}>
              Com Livro
            </Button>
            <Button px={6}
              fontWeight={filter === "without_books" ? "bold" : "semibold"}
              rounded={"full"} onPress={() => setFilter("without_books")} variant={filter === "without_books" ? "solid" : "outline"}>
              Sem Livro
            </Button>
          </HStack>

        </VStack>
        <Divider bg={"gray.300"} shadow={'1'} />

        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <VStack borderBottomWidth={1} borderColor="gray.300" p={3}>
              {editingUserId === item.id ? (
                <>
                  <TextInput
                    value={editedName}
                    onChangeText={setEditedName}
                    style={{ borderBottomWidth: 1, marginBottom: 8 }}
                  />
                  <HStack space={2}>
                    <Button onPress={() => handleUpdate(item.id)} size="sm" colorScheme="green">
                      Salvar
                    </Button>
                    <Button onPress={() => setEditingUserId(null)} size="sm" variant="outline">
                      Cancelar
                    </Button>
                  </HStack>
                </>
              ) : (
                <>
                  <Text fontSize="md" fontWeight="bold">{item.name}</Text>
                  <Text color="gray.500">Livros: {item.book_count}</Text>
                  <HStack space={2} mt={2}>
                    <Button
                      size="sm"
                      onPress={() => {
                        setEditingUserId(item.id)
                        setEditedName(item.name)
                      }}
                      leftIcon={<Ionicons name="create" size={16} color="white" />}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onPress={() => handleDelete(item.id)}
                      leftIcon={<Ionicons name="trash" size={16} color="white" />}
                    >
                      Excluir
                    </Button>
                  </HStack>
                </>
              )}
            </VStack>
          )}
        />
        <NavBar />
      </VStack>

    </VStack>
  )
}
