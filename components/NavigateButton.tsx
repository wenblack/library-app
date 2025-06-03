import { Ionicons } from '@expo/vector-icons'
import { Button, Icon } from 'native-base'

interface NavigateButtonProps {
  onPress: () => void
}

export function NavigateButton({ onPress }: NavigateButtonProps) {
  return (
    <Button
      onPress={onPress}
      position="absolute"
      bottom={80}
      right={20}
      borderRadius="full"
      width={16}
      height={16}
      justifyContent="center"
      alignItems="center"
      bg="primary.500"
      shadow={2}
    >
      <Icon as={Ionicons} name="add" size="sm" color="white" />
    </Button>
  )
}
