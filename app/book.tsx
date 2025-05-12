import { useState } from 'react'
import { Alert, Button, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBookDatabase } from './database/useBookDatabase'

export default function BookForm() {
  const { create } = useBookDatabase()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  async function handleSave() {
    if (!title || !author) return Alert.alert('Preencha todos os campos')
    try {
      await create({ title, author })
      Alert.alert('Livro cadastrado com sucesso!')
      setTitle('')
      setAuthor('')
    } catch (err) {
      Alert.alert('Erro ao cadastrar livro')
    }
  }

  return (
    <SafeAreaView style={{
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{ width: '80%' }}>
        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        />
        <TextInput
          placeholder="Autor"
          value={author}
          onChangeText={setAuthor}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        />
        <Button title="Salvar" onPress={handleSave} />
      </View>
    </SafeAreaView>
  )
}
