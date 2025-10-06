import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/store";
import { AuthProvider } from './firebase/useAuth';
import { ProductsProvider } from "./firebase/useProducts";
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Products from "./pages/Products";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import { OrdersProvider } from "./firebase/useOrders";

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <ProductsProvider>
            <OrdersProvider>
              <BrowserRouter>
                <PageLayout>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/cart' element={<Cart />} />
                  </Routes>
                </PageLayout>
              </BrowserRouter>
            </OrdersProvider>
          </ProductsProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
