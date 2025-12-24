import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Calculator from '../components/Calculator'

const Home = () => {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [popularProducts, setPopularProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopular = () => {
      setLoading(true)
      const filtered = products.filter(p => p.isPopular).slice(0, 4)
      const displayData = filtered.length > 0 ? filtered : products.slice(0, 4)
      setPopularProducts(displayData)
      setLoading(false)
    }
    fetchPopular()
  }, [])

  return (
    /* Убрали pt-16, чтобы контент начинался от самого верха экрана */
    <div className="overflow-x-hidden">
      
      {/* 1. HERO SECTION (Фото под хедером) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Фоновое изображение */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://hackaday.com/wp-content/uploads/2022/06/jan-weber-yVbPfo7jtMA-unsplash.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Тёмный градиент для читаемости хедера и текста */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-slate-900/70 z-0" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20"> 
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
              {t.heroTitle}
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl md:text-3xl text-blue-400 font-semibold mb-6 drop-shadow-md"
            >
              {t.heroSubtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {t.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/contacts"
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/40 active:scale-95"
              >
                {t.ctaOrder}
              </Link>
              <Link
                to="/catalog"
                className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95"
              >
                {t.ctaCatalog}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'ru' ? 'Почему выбирают нас' : 'Why Choose Us'}
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: language === 'ru' ? 'Качество материалов' : 'Material Quality', 
                icon: '🛡️', 
                desc: language === 'ru' ? 'Используем только проверенные профили Akfa и Rehau' : 'We use only certified Akfa and Rehau profiles' 
              },
              { 
                title: language === 'ru' ? 'Опытные мастера' : 'Expert Team', 
                icon: '👷', 
                desc: language === 'ru' ? 'Более 15 лет безупречной работы на рынке' : 'Over 15 years of perfect market presence' 
              },
              { 
                title: language === 'ru' ? 'Гарантия 5 лет' : '5 Year Warranty', 
                icon: '💎', 
                desc: language === 'ru' ? 'Мы полностью уверены в долговечности наших изделий' : 'We are fully confident in our products durability' 
              }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                className="p-10 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR PRODUCTS SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                {language === 'ru' ? 'Популярные товары' : 'Popular Products'}
              </h2>
              <p className="text-gray-500 text-lg">
                {language === 'ru' ? 'Лучшие предложения по мнению покупателей' : 'Best deals according to our customers'}
              </p>
            </div>
            <Link 
              to="/catalog" 
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl border border-blue-100 shadow-sm hover:bg-blue-600 hover:text-white transition-all"
            >
              {language === 'ru' ? 'Смотреть всё' : 'View All'}
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(n => <div key={n} className="h-96 bg-gray-200 animate-pulse rounded-3xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. CALCULATOR SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-gray-900 mb-4">
                 {language === 'ru' ? 'Рассчитать стоимость' : 'Calculate Price'}
               </h2>
               <p className="text-gray-600 text-lg">
                 {language === 'ru' 
                   ? 'Укажите параметры, и мы рассчитаем примерную цену онлайн' 
                   : 'Enter parameters and we will calculate the estimated price online'}
               </p>
            </div>
            <div className="bg-gray-50 p-4 md:p-12 rounded-[2rem] shadow-inner border border-gray-100">
              <Calculator />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home