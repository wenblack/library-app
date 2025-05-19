import { useState } from 'react'
import { Alert, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

    }}>
      <View style={{ width: '80%' }}>
        <Text style={{ fontSize: 22, paddingBottom: 32, fontWeight: '600' }}>Cadastrar novo Usuário</Text>
        <KeyboardAvoidingView behavior="padding" style={{ width: '100%' }}>
          <TextInput
            placeholder="Nome"
            placeholderTextColor={'#999'}
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              marginBottom: 12,
              padding: 8,
              color: 'black',
            }}
          />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={'#999'}
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              marginBottom: 12,
              padding: 8,
              color: 'black'
            }}
            keyboardType="email-address"
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
