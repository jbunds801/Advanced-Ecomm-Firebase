import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from 'redux-persist/integration/react'
import { StrictMode } from 'react'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={new QueryClient()}>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>
  </QueryClientProvider>
)
