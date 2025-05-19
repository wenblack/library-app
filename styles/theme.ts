// theme.ts
import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#e6f4ea',
      100: '#cce9d5',
      200: '#99d3aa',
      300: '#66bd7f',
      400: '#33a754',
      500: '#10A37F', // tom base (inspirado no ChatGPT)
      600: '#0d8669',
      700: '#0a6953',
      800: '#064c3c',
      900: '#032f26',
    },
    background: {
      light: '#ffffff',
      dark: '#121212',
    },
    text: {
      light: '#000000',
      dark: '#ffffff',
    },
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
})
