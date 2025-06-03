import { NavBar } from "@/components/NavBar"
import { NavigateButton } from "@/components/NavigateButton"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Button, Divider, HStack, Text, VStack } from "native-base"
import { useEffect, useState } from "react"
import {
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native"
import { BookWithUser, useBookDatabase } from "../hooks/useBookDatabase"


export default function Home() {
  const { listWithUser, searchByTitle } = useBookDatabase()
  const [searchTerm, setSearchTerm] = useState("")
  const [books, setBooks] = useState<BookWithUser[]>([])
  const [filter, setFilter] = useState<"all" | "available" | "in_use">("all")

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      const allBooks = await listWithUser()
      setBooks(allBooks)
      return
    }

    const results = await searchByTitle(searchTerm)
    setBooks(results)
  }

  const router = useRouter()
  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await listWithUser()
        const filtered =
          filter === "all"
            ? data
            : data.filter((book) =>
              filter === "available"
                ? book.status === "available"
                : book.status !== "available"
            )

        setBooks(filtered)
      } catch (error) {
        console.error("Erro ao buscar livros:", error)
      }
    }

    loadBooks()
  }, [filter])

  return (
    <VStack style={{ flex: 1 }} bg={"white"} >
      <VStack safeAreaTop px={4} space={2}>
        <Text fontSize="2xl" fontWeight="bold" color={'gray.600'}>Livros Cadastrados</Text>
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

        <HStack justifyContent={"space-between"} alignItems={"center"} mb={2}>
          <Button
            onPress={() => setFilter("all")}
            px={6}
            rounded={"full"}
            backgroundColor={filter === "all" ? "#007bff" : "#eee"}
          >
            <Text
              color={filter === "all" ? "white" : "black"}
              fontWeight={filter === "all" ? "bold" : "semibold"}
            >
              Todos
            </Text>
          </Button>
          <Button
            onPress={() => setFilter("available")}
            px={6}
            rounded={"full"}
            backgroundColor={filter === "available" ? "#007bff" : "#eee"}
          >
            <Text
              color={filter === "available" ? "white" : "green.800"}
              fontWeight={filter === "available" ? "bold" : "semibold"}
            >
              Disponíveis
            </Text>
          </Button>
          <Button
            onPress={() => setFilter("in_use")}
            px={6}
            rounded={"full"}
            backgroundColor={filter === "in_use" ? "#007bff" : "#eee"}
          >
            <Text
              color={filter === "in_use" ? "white" : "red.800"}
              fontWeight={filter === "in_use" ? "bold" : "semibold"}
            >
              Em uso
            </Text>
          </Button>
        </HStack>
      </VStack>
      <Divider my={2} bg={"gray.300"} shadow={'1'} />

      <FlatList
        data={books}
        style={{ paddingHorizontal: 16 }}
        keyExtractor={(item) => item.id?.toString() || ""}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/details/${item.id}`)}>
            <VStack padding={4} borderBottomWidth={1} borderColor={"gray.300"}>
              <Text textTransform={'capitalize'} fontSize={'md'} fontWeight={'semibold'}>{item.title}</Text>
              <Text textTransform={'capitalize'} color={"#666"} fontWeight={'normal'}>Autor: {item.author}</Text>
              <Text
                style={{ color: item.status === "available" ? "green" : "red" }}
              >
                Status: {item.status === "available" ? "Disponível" : "Em uso"}
              </Text>
              {item.user_name && (
                <Text style={{ fontStyle: "italic" }}>
                  Reservado por: {item.user_name}
                </Text>
              )}
            </VStack>
          </TouchableOpacity>
        )}
      />
      <NavigateButton name="add" onPress={() => router.push("/add/book")} />
      <NavBar isHome />
    </VStack>
  )
}

