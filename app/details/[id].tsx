import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { useProductDatabase } from "../database/useProductDatabase"

export default function Details() {
  const [data, setData] = useState({
    name: "",
    quantity: 0,
  })

  const productDatabase = useProductDatabase()
  const params = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    if (params.id) {
      productDatabase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            name: response.name,
            quantity: response.quantity,
          })
        }
      })
    }
  }, [params.id])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32 }}>ID: {params.id} </Text>

      <Text style={{ fontSize: 32 }}>Quantidade: {data.quantity}</Text>

      <Text style={{ fontSize: 32 }}>Nome: {data.name}</Text>
      <TouchableOpacity style={{
        backgroundColor: "blue",
        padding: 20,
        marginTop: 15,
        borderRadius: 25,
      }} onPress={() => { router.back() }}>
        <Text style={{ color: 'white', fontSize: 20, padding: 2 }}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
