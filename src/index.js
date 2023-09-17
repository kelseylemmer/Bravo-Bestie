import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { BravoBestie } from "./BravoBestie"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <BravoBestie />
  </BrowserRouter>
)