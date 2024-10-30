import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { GlobalStateProvider } from "./store/globalStoreContext.tsx"

createRoot(document.getElementById("root")!).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>
)
