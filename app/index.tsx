import { NavBar } from "@/components/NavBar"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { VStack } from "native-base"
import { useEffect, useState } from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BookWithUser, useBookDatabase } from "./database/useBookDatabase"

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
    <SafeAreaView style={styles.container}>
      <VStack padding={8}>
        <Text style={styles.title}>Livros Cadastrados</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            paddingHorizontal: 8,
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Buscar livro"
            placeholderTextColor={"#999"}
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{ flex: 1, paddingVertical: 8 }}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            onPress={() => setFilter("all")}
            style={filter === "all" ? styles.selected : styles.filter}
          >
            <Text>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter("available")}
            style={filter === "available" ? styles.selected : styles.filter}
          >
            <Text>Disponíveis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter("in_use")}
            style={filter === "in_use" ? styles.selected : styles.filter}
          >
            <Text>Em uso</Text>
          </TouchableOpacity>
        </View>
      </VStack>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id?.toString() || ""}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/details/${item.id}`)}>
            <View style={styles.item}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.sub}>Autor: {item.author}</Text>
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
            </View>
          </TouchableOpacity>
        )}
      />
      <NavBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: "#ccc" },
  name: { fontSize: 16, fontWeight: "600" },
  sub: { color: "#666" },
  filterContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    justifyContent: "space-around",
  },
  filter: {
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: "#007bff",
    padding: 6,
    borderRadius: 8,
  },
})
