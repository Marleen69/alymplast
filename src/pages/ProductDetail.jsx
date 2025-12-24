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

  // Состояния для отзывов
  const [reviews, setReviews] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  
  // Состояния для формы нового отзыва
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [newReviewText, setNewReviewText] = useState('')

  useEffect(() => {
    // 1. Проверяем авторизацию из общего хранилища (которое мы делали в Header)
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) setCurrentUser(JSON.parse(savedUser))

    // 2. Загружаем отзывы для этого товара
    const savedReviews = localStorage.getItem(`reviews_${id}`)
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    } else {
      // Дефолтные отзывы, если пусто
      setReviews([
        { name: 'Акмаль', text: 'Отличное качество, профиль Akfa оригинал!', rating: 5, date: '12.10.2023' },
        { name: 'Елена', text: 'Поставили очень быстро, ребята молодцы.', rating: 5, date: '15.10.2023' }
      ])
    }
  }, [id])

  // Функция открытия модалки из Header
  const openGlobalAuth = () => {
    window.dispatchEvent(new CustomEvent('openAuthModal'));
  }

  // Добавление отзыва
  const handleAddReview = (e) => {
    e.preventDefault()
    if (!currentUser) return openGlobalAuth()
    
    const newRev = { 
      name: currentUser.name || currentUser.username, 
      text: newReviewText, 
      rating: rating,
      date: new Date().toLocaleDateString()
    }
    
    const updatedReviews = [newRev, ...reviews]
    setReviews(updatedReviews)
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews))
    setNewReviewText('')
    setRating(5)
    alert(language === 'ru' ? 'Отзыв опубликован!' : 'Review published!')
  }

  if (!product) return <div className="pt-20 text-center">Товар не найден</div>

  const name = language === 'ru' ? product.name_ru : product.name_en

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-20 text-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Кнопка назад */}
        <Link to="/catalog" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-8 transition-colors font-medium">
          ← {language === 'ru' ? 'Назад к каталогу' : 'Back to catalog'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* ЛЕВАЯ ЧАСТЬ: ФОТО И 3D */}
          <div className="space-y-6">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              src={product.img} 
              alt={name} 
              className="w-full rounded-3xl shadow-xl object-cover h-[450px]" 
            />
            <div className="bg-white p-6 rounded-3xl shadow-md h-[400px] border border-gray-100 relative overflow-hidden">
                <h3 className="text-center font-bold text-gray-400 mb-4 uppercase text-[10px] tracking-[0.2em]">3D Модель</h3>
                <Product3DViewer modelPath={product.model3d} />
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ: ИНФО */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">{name}</h1>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {language === 'ru' ? product.description_ru : product.description_en}
              </p>
              
              <div className="flex items-baseline space-x-2 mb-8">
                <span className="text-4xl font-black text-blue-600">
                    {product.price?.toLocaleString()}
                </span>
                <span className="text-xl font-bold text-blue-600 uppercase">
                    {language === 'ru' ? 'сом' : 'som'}
                </span>
              </div>

              {/* ХАРАКТЕРИСТИКИ */}
              <div className="mb-8 border-t border-gray-100 pt-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-5">
                  {language === 'ru' ? 'Характеристики' : 'Specifications'}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="font-bold text-gray-500">{language === 'ru' ? 'Категория' : 'Category'}</span>
                    <span className="font-bold text-blue-600">{product.category}</span>
                  </li>
                  {product.material_ru && (
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="font-bold text-gray-500">{language === 'ru' ? 'Материал' : 'Material'}</span>
                      <span className="text-gray-900 font-medium">{language === 'ru' ? product.material_ru : product.material_en}</span>
                    </li>
                  )}
                </ul>
              </div>
              
              <Link to="/contacts" className="block w-full bg-blue-600 text-white text-center py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-[0.98]">
                {language === 'ru' ? 'Заказать сейчас' : 'Order Now'}
              </Link>
            </div>

            {/* БЛОК ОТЗЫВОВ */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Отзывы покупателей</h3>

              {currentUser ? (
                <form onSubmit={handleAddReview} className="mb-10 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-bold text-blue-900">Оставить отзыв как: <span className="underline">{currentUser.name || currentUser.username}</span></p>
                    
                    {/* ЗВЕЗДЫ В ФОРМЕ */}
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                          onClick={() => setRating(star)}
                          className={`text-2xl transition-all ${
                            (hover || rating) >= star ? 'text-yellow-400 scale-110' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea 
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder={language === 'ru' ? "Ваше мнение о товаре..." : "Your review..."}
                    className="w-full p-5 rounded-2xl border-none focus:ring-2 focus:ring-blue-400 outline-none h-28 mb-4 shadow-inner bg-white"
                    required
                  />
                  <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    Опубликовать отзыв
                  </button>
                </form>
              ) : (
                <div className="mb-10 p-10 border-2 border-dashed border-gray-200 rounded-[2rem] text-center bg-gray-50/50">
                  <p className="text-gray-500 mb-6 font-medium">Чтобы оставить отзыв и поставить оценку, пожалуйста, войдите в аккаунт</p>
                  <button 
                    onClick={openGlobalAuth}
                    className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-95"
                  >
                    Войти или Зарегистрироваться
                  </button>
                </div>
              )}

              {/* СПИСОК ОТЗЫВОВ */}
              <div className="space-y-8">
                {reviews.length > 0 ? reviews.map((rev, i) => (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    key={i} 
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {rev.name[0]}
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block leading-none">{rev.name}</span>
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">{rev.date || 'Недавно'}</span>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 text-sm">
                        {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100 group-hover:bg-white group-hover:shadow-md transition-all italic">
                        "{rev.text}"
                    </p>
                  </motion.div>
                )) : (
                    <p className="text-center text-gray-400 italic">Отзывов пока нет. Будьте первым!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail