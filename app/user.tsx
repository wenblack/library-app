import { useState } from 'react'
import { Alert, Button, SafeAreaView, TextInput, View } from 'react-native'
import { useUserDatabase } from './database/useUserDatabase'

export default function UserForm() {
  const { create } = useUserDatabase()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSave() {
    if (!name || !email) return Alert.alert('Preencha todos os campos')
    try {
      await create({ name, email })
      Alert.alert('Usuário cadastrado com sucesso!')
      setName('')
      setEmail('')
    } catch (err) {
      Alert.alert('Erro ao cadastrar usuário')
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
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        />
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
          keyboardType="email-address"
        />
        <Button title="Salvar" onPress={handleSave} />
      </View>
    </SafeAreaView>
  )
}
