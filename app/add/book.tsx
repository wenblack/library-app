import { InputText } from '@/components/InputText'
import { NavBar } from '@/components/NavBar'
import { Button, KeyboardAvoidingView, Text, VStack } from 'native-base'
import { useState } from 'react'
import { Alert } from 'react-native'
import { useBookDatabase } from '../../hooks/useBookDatabase'

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
        <KeyboardAvoidingView behavior="padding" style={{ width: '100%' }}>
          <Text fontSize={'2xl'} pb={8} fontWeight={'semibold'} >Cadastrar Livro</Text>

          <InputText
            placeholder='Título'
            onChangeText={setTitle}
            value={title}
          />
          <InputText
            placeholder='Autor'
            onChangeText={setAuthor}
            value={author}
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
