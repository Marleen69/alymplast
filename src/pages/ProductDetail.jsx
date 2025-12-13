import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { getProductById } from '../data/products'
import Product3DViewer from '../components/Product3DViewer'

const ProductDetail = () => {
  const { id } = useParams()
  const { language } = useLanguage()
  const t = translations[language]
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ru' ? 'Товар не найден' : 'Product not found'}
          </h1>
          <Link
            to="/catalog"
            className="text-primary-600 hover:text-primary-700"
          >
            {language === 'ru' ? 'Вернуться в каталог' : 'Back to catalog'}
          </Link>
        </div>
      </div>
    )
  }

  const name = language === 'ru' ? product.name_ru : product.name_en
  const description =
    language === 'ru' ? product.description_ru : product.description_en

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/catalog"
          className="text-primary-600 hover:text-primary-700 mb-6 inline-block"
        >
          ← {language === 'ru' ? 'Назад к каталогу' : 'Back to catalog'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image and 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <img
                src={product.img}
                alt={name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <Product3DViewer />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
            <p className="text-gray-600 text-lg mb-8">{description}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === 'ru' ? 'Характеристики' : 'Specifications'}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    • {language === 'ru' ? 'Категория' : 'Category'}: {product.category}
                  </li>
                  <li>
                    • {language === 'ru' ? 'Материал' : 'Material'}:{' '}
                    {language === 'ru' ? 'Пластик премиум' : 'Premium Plastic'}
                  </li>
                  <li>
                    • {language === 'ru' ? 'Гарантия' : 'Warranty'}: 5{' '}
                    {language === 'ru' ? 'лет' : 'years'}
                  </li>
                </ul>
              </div>

              <Link
                to="/contacts"
                className="block w-full bg-primary-600 text-white text-center py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                {t.ctaOrder}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail






