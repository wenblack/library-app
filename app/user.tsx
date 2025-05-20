import { NavBar } from '@/components/NavBar'
import { Button, KeyboardAvoidingView, Text, VStack } from 'native-base'
import { useState } from 'react'
import { Alert, TextInput } from 'react-native'
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
    <VStack
      safeAreaTop
      flex={1}
      bg={'white'}
      justifyContent={'space-between'}
    >
      <VStack
        w={"80%"}
        h={'80%'}
        alignSelf={'center'}
        justifyContent={'center'}
      >
        <Text fontSize={'2xl'} pb={8} fontWeight={'semibold'}>Cadastrar novo Usuário</Text>
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
              paddingLeft: 12,
              borderRadius: 8,
              borderColor: '#999'
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
              paddingLeft: 12,
              borderRadius: 8,
              borderColor: '#999'
            }}
            keyboardType="email-address"
          />
        </KeyboardAvoidingView>
        <Button onPress={handleSave}
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            borderRadius: 8,
            marginTop: 32
          }}>
          <Text style={{ color: 'white' }}>Salvar</Text>
        </Button>
      </VStack>
      <NavBar />
    </VStack >
  )
}
