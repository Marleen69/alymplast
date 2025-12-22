import { motion, AnimatePresence } from 'framer-motion'
import { useFavorites } from '../contexts/FavoritesContext'
import { useLanguage } from '../contexts/LanguageContext'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

const FavoritesPage = () => {
  const { favorites } = useFavorites()
  const { language } = useLanguage()

  return (
    <div className="pt-28 min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {language === 'ru' ? 'Избранные товары' : 'My Favorites'}
          </h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        {favorites.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {favorites.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-gray-100"
          >
            <div className="text-8xl mb-6">📂</div>
            <p className="text-2xl text-gray-400 font-medium mb-8">
              {language === 'ru' ? 'Ваш список избранного пуст' : 'Your favorites list is empty'}
            </p>
            <Link 
              to="/catalog" 
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-100 transition-all active:scale-95"
            >
              {language === 'ru' ? 'Вернуться в каталог' : 'Go to Catalog'}
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage