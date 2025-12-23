import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contacts from './pages/Contacts';
import FavoritesPage from './pages/FavoritesPage';
import Admin from './pages/Admin/Admin';

function App() {
  // 1. Создаем состояние для темы
  const [isDark, setIsDark] = useState(() => {
    // Проверяем, сохранял ли пользователь тему раньше
    return localStorage.getItem('theme') === 'dark';
  });

  // 2. Следим за изменениями и вешаем класс 'dark' на тег <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Функция для переключения (ее нужно будет передать в Header через пропсы или контекст)
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <LanguageProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            {/* ВАЖНО: Передаем toggleTheme и isDark в Layout, 
               чтобы кнопка в хедере могла ими управлять 
            */}
            <Route path="/" element={<Layout isDark={isDark} toggleTheme={toggleTheme} />}>
              <Route index element={<Home />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="catalog/:id" element={<ProductDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="favorites" element={<FavoritesPage />} />
            </Route>

            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </LanguageProvider>
  );
}

export default App;