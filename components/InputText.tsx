import { TextInput } from "react-native"

interface InputTextProps {
  placeholder: string
  placeholderTextColor?: string
  value: string
  onSubmitEditing?: () => void
  onChangeText: (text: string) => void
}

export function InputText({ placeholder, placeholderTextColor, value, onChangeText, onSubmitEditing }: InputTextProps) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor || '#999'}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      style={{ borderWidth: 1, marginBottom: 12, padding: 8, paddingLeft: 12, borderRadius: 8, borderColor: '#999' }}
    />
  )
}
