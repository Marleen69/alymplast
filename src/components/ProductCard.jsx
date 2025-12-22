import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useFavorites } from '../contexts/FavoritesContext' // ИСПРАВЛЕНО: добавлено название файла

const ProductCard = ({ product }) => {
  const { language } = useLanguage()
  const { toggleFavorite, isFavorite } = useFavorites() 
  
  const name = language === 'ru' ? product.name_ru : product.name_en
  const description = language === 'ru' ? product.description_ru : product.description_en
  
  const active = isFavorite(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer relative"
    >
      {/* Кнопка Избранное (Сердечко) */}
      <button 
        onClick={(e) => {
          e.preventDefault(); 
          e.stopPropagation(); // Дополнительная защита от перехода по ссылке
          toggleFavorite(product);
        }}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all hover:scale-110 active:scale-90"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill={active ? "currentColor" : "none"} 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className={`w-6 h-6 transition-colors ${active ? "text-red-500" : "text-gray-400"}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>

      <Link to={`/catalog/${product.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.img}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{name}</h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{description}</p>
          
          <div className="flex items-center justify-between mt-auto">
            {/* Цена в сомах */}
            <span className="text-blue-600 font-bold text-lg">
              {product.price?.toLocaleString()} {language === 'ru' ? 'сом' : 'som'}
            </span>
            
            <span className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard