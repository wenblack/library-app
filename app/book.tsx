import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{ width: '80%' }}>
        <KeyboardAvoidingView behavior="padding" style={{ width: '100%' }}>
          <Text style={{ fontSize: 22, paddingBottom: 32, fontWeight: '600' }}>Cadastrar um Livro</Text>
          <TextInput
            placeholder="Título"
            placeholderTextColor={'#999'}
            value={title}
            onChangeText={setTitle}
            style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
          />
          <TextInput
            placeholder="Autor"
            placeholderTextColor={'#999'}
            value={author}
            onChangeText={setAuthor}
            style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={handleSave}
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            borderRadius: 8,
            marginTop: 32
          }}>
          <Text style={{ color: 'white' }}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}
