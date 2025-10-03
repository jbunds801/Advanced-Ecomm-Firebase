import ReactDOM from "react-dom/client";
import { PersistGate } from 'redux-persist/integration/react'
import { StrictMode } from 'react'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { ProductsProvider } from "./firebase/useProducts.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
