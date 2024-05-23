import { createTheme } from "@mui/material";

const Theme = createTheme({
  direction: "rtl",

  palette: {
    mode: "dark",
    primary: {
      main: "#6a1b9a",
    },
    secondary: {
      main: "#ec407a",
    },
  },
  typography: {
    fontFamily: ["vazir", "vazir-bold", "roboto", "sans-serif"].join(","),
  },
});

export default Theme;
