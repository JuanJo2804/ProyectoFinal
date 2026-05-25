import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/organisms/login/Login.jsx';
import Register from './components/organisms/register/Register.jsx';
import Gallery from './components/organisms/gallery/Gallery.jsx';
import Header from './components/organisms/header/Header.jsx';
import Cart from './components/organisms/cart/Cart.jsx';
import ProductDetail from './components/organisms/product/ProductDetail.jsx';
import Profile from './components/organisms/profile/Profile.jsx';
import Settings from './components/organisms/settings/Settings.jsx';
import { SearchProvider } from './context/SearchContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gallery" element={<><Header /><Gallery /></>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

