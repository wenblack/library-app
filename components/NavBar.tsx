// app/_layout.tsx ou dentro da sua tela principal

import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import { Box, HStack, Icon, Pressable, Text } from "native-base";

export function NavBar() {
  const router = useRouter();
  const segments = useSegments();

  const activeSegment = segments[segments.length - 1];

  const tabs = [
    { name: "Livros", route: "/", icon: "book" },
    { name: "Cadastrar Livro", route: "book", icon: "add-circle" },
    { name: "Cadastrar Usuário", route: "user", icon: "person-add" },
  ];

  return (
    <Box safeAreaBottom shadow={2}>
      <HStack justifyContent="space-around">
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
    </Box>
  );
}
