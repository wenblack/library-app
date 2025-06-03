import { Ionicons } from '@expo/vector-icons'
import { Button, HStack, Icon } from 'native-base'

interface NavigateButtonProps {
  onPress: () => void
  name: string
}

export function NavigateButton({ onPress, name }: NavigateButtonProps) {
  return (
    <Button
      onPress={onPress}
      position="absolute"
      bottom={'15%'}
      right={"2%"}
      borderRadius="full"
      width={16}
      height={16}
      justifyContent="center"
      alignItems="center"
      bg="primary.500"
      shadow={2}
    >
      <HStack color="white" flex={'row'} alignItems={"center"} justifyContent={'center'} fontSize="xl" >
        <Icon as={Ionicons} name={name} size="xl" color="white" />
      </HStack>
    </Button>
  )
}
