import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { FavoritesProvider } from './contexts/FavoritesContext' // Исправлен путь к контексту
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contacts from './pages/Contacts'
import FavoritesPage from './pages/FavoritesPage' // Исправлен путь к странице
import Admin from './pages/Admin/Admin'

function App() {
  return (
    <LanguageProvider>
      {/* Провайдер избранного должен быть внутри LanguageProvider, но снаружи BrowserRouter */}
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            {/* Публичный сайт через Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="catalog/:id" element={<ProductDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contacts" element={<Contacts />} />
              {/* Страница избранного */}
              <Route path="favorites" element={<FavoritesPage />} />
            </Route>

            {/* Админ-панель без Layout */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </LanguageProvider>
  )
}

export default App