// app/_layout.tsx ou dentro da sua tela principal

import { Ionicons } from "@expo/vector-icons"
import { useRouter, useSegments } from "expo-router"
import { Box, HStack, Icon, Pressable, Text } from "native-base"
import { Platform } from "react-native"

interface Tab {
  isHome?: boolean
}
export function NavBar({ isHome }: Tab) {
  const router = useRouter()
  const segments = useSegments()

  let activeSegment = segments[segments.length - 1]

  const tabs = [
    { name: "Livros", route: "/", icon: "book" },
    { name: "Usuários", route: "/list", icon: "person" },
  ]
  if (isHome) {
    return (
      <Box py={4} borderTopWidth={'1'} borderColor={"gray.200"} bg={"white"}  >
        <HStack safeAreaBottom={Platform.OS === "android" ? 10 : 4}>

          <Pressable
            key={'book'}
            onPress={() => router.push('/')}
            flex={1}
          >
            <Box alignItems="center">
              <Icon
                as={Ionicons}
                name={"book"}
                size="md"
                color={
                  "primary.500"
                }
              />
              <Text
                fontSize="xs"
                color={
                  "primary.500"
                }
              >
                {"Livros"}
              </Text>
            </Box>
          </Pressable>
          <Pressable
            key={"person"}
            onPress={() => router.push("/list")}
            flex={1}
          >
            <Box alignItems="center">
              <Icon
                as={Ionicons}
                name={"person"}
                size="md"
                color={
                  "gray.400"
                }
              />
              <Text
                fontSize="xs"
                color={
                  "gray.400"
                }
              >
                {"Usuários"}
              </Text>
            </Box>
          </Pressable>
        </HStack>
      </Box >
    )


  }

  return (
    <Box py={4} borderTopWidth={'1'} borderColor={"gray.200"} bg={"white"}  >
      <HStack safeAreaBottom={Platform.OS === "android" ? 10 : 4}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.route}
            onPress={() => router.push(tab.route as any)}
            flex={1}
          >
            <Box alignItems="center">
              <Icon
                as={Ionicons}
                name={tab.icon}
                size="md"
                color={
                  activeSegment === tab.route.replace("/", "")
                    ? "primary.500"
                    : "gray.400"
                }
              />
              <Text
                fontSize="xs"
                color={
                  activeSegment === tab.route.replace("/", "")
                    ? "primary.500"
                    : "gray.400"
                }
              >
                {tab.name}
              </Text>
            </Box>
          </Pressable>
        ))}
      </HStack>
    </Box >
  )
}
