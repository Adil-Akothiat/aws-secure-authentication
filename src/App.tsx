import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Header from './layouts/header';
import Footer from './layouts/footer';
import MainProtectMiddleware from './protectRoute/mainProtect';
import { Suspense, useEffect } from 'react';
import AuthLoader from './components/loader';
import PublicOnlyMiddleware from './protectRoute/isAuth';
import AOS from "aos"
import "aos/dist/aos.css";

function App() {
  useEffect(()=>{
    AOS.init({
      once: true
    });
  },[])
  return (
    <BrowserRouter>
    <Suspense fallback={<AuthLoader />}>
      <Header />
      <Routes>
        <Route element={<PublicOnlyMiddleware />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route element={<MainProtectMiddleware />}>
          <Route path='/aws-cognito-welcom' element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
