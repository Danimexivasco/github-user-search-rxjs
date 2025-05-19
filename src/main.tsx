import { render } from "preact";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import { App } from "./app.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
  , document.getElementById("app")!);
