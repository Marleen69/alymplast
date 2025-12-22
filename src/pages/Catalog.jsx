import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { products as initialProducts } from '../data/products' 
import ProductCard from '../components/ProductCard'

const Catalog = () => {
  const { language } = useLanguage()
  const t = translations[language]
  
  // Состояния для фильтров
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(100000) 
  const [allProducts, setAllProducts] = useState([])

  // Загружаем актуальный список товаров
  useEffect(() => {
    const saved = localStorage.getItem('site_products')
    if (saved) {
      setAllProducts(JSON.parse(saved))
    } else {
      setAllProducts(initialProducts)
    }
  }, [])

  const categories = [
    { value: '', label: t.filterAll },
    { value: 'akfa', label: 'Akfa' },
    { value: 'windows', label: t.filterWindows },
    { value: 'doors', label: t.filterDoors },
    { value: 'balconies', label: t.filterBalconies },
    { value: 'sliding', label: t.filterSliding },
  ]

  // Логика фильтрации
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory
    const isAvailable = product.inStock !== false 
    const matchesSearch = 
      product.name_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name_en.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price <= maxPrice

    return matchesCategory && isAvailable && matchesSearch && matchesPrice
  })

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t.catalogTitle}</h1>
          <p className="text-xl text-gray-600">{t.catalogSubtitle}</p>
        </motion.div>

        {/* БЛОК ФИЛЬТРОВ: ПОИСК И ЦЕНА (СОМ) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-6 items-end">
          
          {/* Поиск */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ru' ? 'Поиск по названию' : 'Search by name'}
            </label>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ru' ? "Например: Окно Akfa..." : "Search..."}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Фильтр по цене в Сомах */}
          <div className="w-full md:w-80">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                {language === 'ru' ? 'Макс. цена:' : 'Max price:'}
              </label>
              <span className="text-sm font-bold text-blue-600">
                {maxPrice.toLocaleString()} {language === 'ru' ? 'сом' : 'som'}
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="150000" // Увеличил лимит, так как цены могут быть выше
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Категории */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                  : 'bg-white text-gray-600 border border-gray-100 hover:border-blue-300 hover:text-blue-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Сетка товаров */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
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

        {/* Если пусто */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-xl font-medium">
              {language === 'ru' ? 'Ничего не найдено в этом диапазоне' : 'No results found in this range'}
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setMaxPrice(150000); setSelectedCategory('')}}
              className="mt-4 text-blue-600 hover:underline font-medium"
            >
              {language === 'ru' ? 'Сбросить все фильтры' : 'Reset all filters'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Catalog