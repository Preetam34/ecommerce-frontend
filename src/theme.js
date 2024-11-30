import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"],
    color: "#801317",
    fontSize: 14,
  },
  palette: {
    primary: {
      main: "#801317",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
