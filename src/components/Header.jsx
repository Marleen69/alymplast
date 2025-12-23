import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { translations } from '../data/translations'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  
  // Инициализация темы из localStorage
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  const { language, toggleLanguage } = useLanguage()
  const { favorites } = useFavorites()
  const location = useLocation()
  const t = translations[language]

  // Логика переключения темы
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const checkUser = () => {
    const savedUser = localStorage.getItem('current_user')
    if (savedUser) setUser(JSON.parse(savedUser))
    else setUser(null)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    checkUser()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('storage', checkUser)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('storage', checkUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('current_user')
    setUser(null)
    window.dispatchEvent(new Event('storage'))
  }

  const navItems = [
    { path: '/', label: t.home },
    { path: '/catalog', label: t.catalog },
    { path: '/about', label: t.about },
    { path: '/contacts', label: t.contacts },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              AlymPlast
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Favorites */}
            <Link to="/favorites" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-yellow-400 hover:scale-110 transition-transform"
            >
              {isDark ? "🌙" : "☀️"}
            </button>

            <button onClick={toggleLanguage} className="font-bold text-gray-700 dark:text-gray-300">
              {language.toUpperCase()}
            </button>

            {/* Burger */}
            <button 
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 shadow-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header