import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { getProductById } from '../data/products'
import Product3DViewer from '../components/Product3DViewer'

const ProductDetail = () => {
  const { id } = useParams()
  const { language } = useLanguage()
  const t = translations[language]
  const product = getProductById(id)

  // Состояния для отзывов и пользователя
  const [reviews, setReviews] = useState([])
  const [user, setUser] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authData, setAuthData] = useState({ username: '', password: '' })
  const [newReviewText, setNewReviewText] = useState('')

  useEffect(() => {
    // Проверяем, вошел ли пользователь (из LocalStorage)
    const savedUser = localStorage.getItem('current_user')
    if (savedUser) setUser(JSON.parse(savedUser))

    // Загружаем отзывы для конкретного товара
    const savedReviews = localStorage.getItem(`reviews_${id}`)
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    } else {
      // Начальные дефолтные отзывы
      setReviews([
        { name: 'Акмаль', text: 'Отличное качество, профиль Akfa оригинал!', rating: 5 },
        { name: 'Елена', text: 'Поставили очень быстро, ребята молодцы.', rating: 5 }
      ])
    }
  }, [id])

  // Регистрация / Вход (упрощенно)
  const handleAuth = (e) => {
    e.preventDefault()
    if (authData.username.length > 2) {
      localStorage.setItem('current_user', JSON.stringify(authData))
      setUser(authData)
      setShowAuthModal(false)
    }
  }

  // Добавление отзыва
  const handleAddReview = (e) => {
    e.preventDefault()
    if (!user) return setShowAuthModal(true)
    
    const newRev = { name: user.username, text: newReviewText, rating: 5 }
    const updatedReviews = [newRev, ...reviews]
    setReviews(updatedReviews)
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews))
    setNewReviewText('')
  }

  if (!product) return <div className="pt-20 text-center">Товар не найден</div>

  const name = language === 'ru' ? product.name_ru : product.name_en

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-12">
        {/* Кнопка назад */}
        <Link to="/catalog" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8 transition-colors">
          ← {language === 'ru' ? 'Назад к каталогу' : 'Back to catalog'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Левая часть: Фото и 3D */}
          <div className="space-y-6">
            <motion.img 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              src={product.img} 
              alt={name} 
              className="w-full rounded-3xl shadow-xl object-cover h-[400px]" 
            />
            <div className="bg-white p-6 rounded-3xl shadow-md h-[400px] border border-gray-100">
                <h3 className="text-center font-bold text-gray-400 mb-4 uppercase text-xs tracking-widest">3D Модель</h3>
                <Product3DViewer modelPath={product.model3d} />
            </div>
          </div>

          {/* Правая часть: Инфо и Характеристики */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {language === 'ru' ? product.description_ru : product.description_en}
              </p>
              
              {/* ЦЕНА В СОМАХ */}
              <p className="text-3xl font-bold text-blue-600 mb-8">
                {product.price?.toLocaleString()} {language === 'ru' ? 'сом' : 'som'}
              </p>

              {/* ХАРАКТЕРИСТИКИ */}
              <div className="mb-8 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'ru' ? 'Характеристики' : 'Specifications'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-3 shrink-0"></span>
                    <span className="font-semibold mr-2">{language === 'ru' ? 'Категория:' : 'Category:'}</span>
                    <span className="text-gray-600">{product.category}</span>
                  </li>
                  {product.material_ru && (
                    <li className="flex items-center text-gray-700">
                      <span className="w-4 h-4 bg-blue-500 rounded-full mr-3 shrink-0"></span>
                      <span className="font-semibold mr-2">{language === 'ru' ? 'Материал:' : 'Material:'}</span>
                      <span className="text-gray-600">{language === 'ru' ? product.material_ru : product.material_en || product.material_ru}</span>
                    </li>
                  )}
                  {product.warranty_ru && (
                    <li className="flex items-center text-gray-700">
                      <span className="w-4 h-4 bg-blue-500 rounded-full mr-3 shrink-0"></span>
                      <span className="font-semibold mr-2">{language === 'ru' ? 'Гарантия:' : 'Warranty:'}</span>
                      <span className="text-gray-600">{language === 'ru' ? product.warranty_ru : product.warranty_en || product.warranty_ru}</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <Link to="/contacts" className="block w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
                {language === 'ru' ? 'Заказать' : 'Order Now'}
              </Link>
            </div>

            {/* БЛОК ОТЗЫВОВ */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-6 italic text-gray-800">Отзывы покупателей</h3>

              {user ? (
                <form onSubmit={handleAddReview} className="mb-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-sm mb-3 font-medium text-blue-800">Вы вошли как: <b>{user.username}</b></p>
                  <textarea 
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Напишите ваш отзыв..."
                    className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-blue-400 outline-none h-24 mb-3 shadow-inner"
                    required
                  />
                  <div className="flex justify-between items-center">
                    <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-md">
                      Опубликовать
                    </button>
                    <button onClick={() => {localStorage.removeItem('current_user'); setUser(null)}} className="text-xs text-red-500 hover:underline">Выйти</button>
                  </div>
                </form>
              ) : (
                <div className="mb-8 p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center bg-gray-50">
                  <p className="text-gray-500 mb-4 font-medium">Только зарегистрированные пользователи могут оставлять отзывы</p>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gray-900 text-white px-10 py-3 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg"
                  >
                    Войти или Зарегистрироваться
                  </button>
                </div>
              )}

              {/* Список отзывов */}
              <div className="space-y-6">
                {reviews.map((rev, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-gray-900">{rev.name}</span>
                      <span className="text-yellow-400 tracking-tighter">★★★★★</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic">"{rev.text}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО РЕГИСТРАЦИИ */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="bg-white w-full max-w-md p-10 rounded-[2.5rem] shadow-2xl relative"
            >
              <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl transition-colors">✕</button>
              <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Вход в систему</h2>
              <form onSubmit={handleAuth} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Имя пользователя</label>
                  <input 
                    type="text" required
                    className="w-full p-4 bg-gray-100 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800"
                    value={authData.username}
                    onChange={(e) => setAuthData({...authData, username: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Пароль</label>
                  <input 
                    type="password" required
                    className="w-full p-4 bg-gray-100 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800"
                    value={authData.password}
                    onChange={(e) => setAuthData({...authData, password: e.target.value})}
                  />
                </div>
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all mt-4">
                  Зарегистрироваться и войти
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductDetail