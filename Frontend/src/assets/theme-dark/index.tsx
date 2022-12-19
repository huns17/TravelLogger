import { createTheme } from "@mui/material";

const themeDark = createTheme({
  palette: {
    primary: {
      main: "#06060e",
    },
    secondary: {
      main: "#201e1f",
    },
    text: {
      primary: "rgba(255,246,246,0.87)",
      secondary: "rgba(220,199,199,0.54)",
      disabled: "rgba(255,255,255,0.38)",
    },
    background: {
      default: "#141313",
      paper: "#040101",
    },
  },
});

export default themeDark;
