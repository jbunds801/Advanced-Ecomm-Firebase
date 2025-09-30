import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";


function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  return (
    <>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/about' element={<About />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </>
  );
};

export default App;
