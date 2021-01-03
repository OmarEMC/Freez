import theme from '@chakra-ui/theme';

let custom = {
  colors: Object.assign(theme.colors, {
    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#72767D",
      700: "#36393F",
      800: "#292B2F"
    },
    blue: {
      50: "#ebf8ff",
      100: "#ceedff",
      200: "#32b9db",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#249ebd",
      600: "#2a69ac",
      700: "#1e4e8c",
      800: "#153e75",
      900: "#1a365d",
    }
  })
}

export default Object.assign(theme, custom)