import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { BravoBestie } from "./BravoBestie"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { Layout } from "./components/Layout";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";


const theme = createTheme({
  palette: {
    primary: {
      main: "#EC6938"
    },
    secondary: {
      main: "#FFFFE2",
    },
  },
});


const container = document.getElementById("root")
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <ScopedCssBaseline>
      <BrowserRouter>
        <Layout>
          <BravoBestie />
        </Layout>
      </BrowserRouter>
    </ScopedCssBaseline>
  </ThemeProvider>
)