import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { translations } from '../data/translations'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isLoginView, setIsLoginView] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  
  const { language, toggleLanguage } = useLanguage()
  const { favorites } = useFavorites()
  const location = useLocation()
  const t = translations[language]

  // ЛОГИКА ПРОЗРАЧНОСТИ: Только на главной ('/') и только в самом верху (isScrolled === false)
  const isHomePage = location.pathname === '/'
  const isTransparent = isHomePage && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    
    const handleOpenAuth = () => setIsAuthOpen(true)
    window.addEventListener('openAuthModal', handleOpenAuth)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('openAuthModal', handleOpenAuth)
    }
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const handleAuth = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (isLoginView) {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(language === 'ru' ? `Добро пожаловать, ${user.name}!` : `Welcome, ${user.name}!`);
        setIsAuthOpen(false);
        window.location.reload();
      } else {
        alert(language === 'ru' ? 'Неверный email или пароль' : 'Invalid email or password');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) return;
      if (users.find(u => u.email === formData.email)) return;

      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(formData));
      setIsAuthOpen(false);
      window.location.reload();
    }
  };

  const navItems = [
    { path: '/', label: t.home },
    { path: '/catalog', label: t.catalog },
    { path: '/about', label: t.about },
    { path: '/contacts', label: t.contacts },
  ]

  // Динамические цвета для элементов
  const textColorClass = isTransparent ? 'text-white' : 'text-gray-700'
  const logoColorClass = isTransparent ? 'text-white' : 'text-blue-600'
  const iconColorClass = isTransparent ? 'text-white' : 'text-gray-700'
  const borderColorClass = isTransparent ? 'border-white/30' : 'border-gray-300'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isTransparent 
          ? 'bg-transparent py-5' 
          : 'bg-white/95 shadow-md py-2 backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Логотип */}
          <Link to="/" className={`text-2xl font-bold transition-colors duration-500 ${logoColorClass}`}>
            AlymPlast
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`font-medium transition-all duration-300 ${textColorClass} ${
                  location.pathname === item.path 
                    ? (isTransparent ? 'text-blue-300' : 'text-blue-600') 
                    : 'hover:text-blue-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Избранное */}
            <Link to="/favorites" className={`relative p-2 transition-colors duration-500 hover:text-red-500 ${iconColorClass}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              {favorites.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{favorites.length}</span>}
            </Link>

            {/* Язык */}
            <button onClick={toggleLanguage} className={`font-bold px-2 uppercase text-sm transition-colors duration-500 ${textColorClass}`}>
              {language}
            </button>

            {/* Профиль/Авторизация */}
            <button 
              onClick={() => setIsAuthOpen(true)} 
              className={`p-2 border-l pl-4 transition-all duration-500 ${borderColorClass} ${iconColorClass}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
            </button>

            {/* Бургер (мобильный) */}
            <button className={`md:hidden p-2 transition-colors duration-500 ${iconColorClass}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen 
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> 
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* --- МОБИЛЬНОЕ МЕНЮ --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-white pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col space-y-6 text-center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-2xl font-bold ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-800'}`}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-gray-100" />
              <button onClick={toggleLanguage} className="text-xl font-bold text-gray-500 uppercase">
                {language === 'ru' ? 'Сменить язык' : 'Change Language'} ({language})
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- МОДАЛЬНОЕ ОКНО АВТОРИЗАЦИИ --- */}
      <AnimatePresence>
        {isAuthOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAuthOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl text-gray-900" >
              <h2 className="text-3xl font-bold mb-6 text-center">{isLoginView ? 'Вход' : 'Регистрация'}</h2>
              <form className="space-y-4" onSubmit={handleAuth}>
                {!isLoginView && <input required type="text" placeholder="Имя" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" onChange={(e) => setFormData({...formData, name: e.target.value})} />}
                <input required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input required type={showPassword ? "text" : "password"} placeholder="Пароль" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="showPassHeader" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                  <label htmlFor="showPassHeader" className="text-sm">Показать пароль</label>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
                  {isLoginView ? 'Войти' : 'Создать аккаунт'}
                </button>
              </form>
              <button onClick={() => setIsLoginView(!isLoginView)} className="w-full mt-4 text-blue-600 text-sm font-bold">
                {isLoginView ? 'Зарегистрироваться' : 'Уже есть аккаунт?'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header