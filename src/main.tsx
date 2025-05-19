import { render } from "preact";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// @ts-expect-error Importing fontsource caveat may cause type errors
import "@fontsource/caveat";
import { App } from "./app.tsx";

import "./index.css";

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
