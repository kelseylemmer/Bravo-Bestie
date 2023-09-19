import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { BravoBestie } from "./BravoBestie"
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { Layout } from "./components/Layout";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";



const theme = createTheme({
  palette: {
    primary: {
      main: "#EC6938",
    },
    secondary: {
      main: "#FFFFE2",
    },
  },
  typography: {
    fontFamily: "DM Sans, sans- serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 500,
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