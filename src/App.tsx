import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './firebase/useAuth';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Products from "./pages/Products";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";

function App() {

  return (
    <>
      <AuthProvider>
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
      </AuthProvider>
    </>
  );
};

export default App;
