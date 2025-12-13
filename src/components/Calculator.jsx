import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

const Calculator = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [materialType, setMaterialType] = useState('standard')
  const [calculationSteps, setCalculationSteps] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null)

  const calculatePrice = () => {
    if (!width || !height) {
      alert(language === 'ru' ? 'Заполните все поля' : 'Fill in all fields')
      return
    }

    const w = parseFloat(width) || 0
    const h = parseFloat(height) || 0

    // Цена за единицу площади для каждого типа материала
    const pricePerUnit = {
      standard: 35,
      premium: 45,
      lux: 55,
    }

    // Шаг 1: Высота × Ширина = площадь
    const step1 = w * h
    const step1Text = language === 'ru' 
      ? `Высота × Ширина = ${h} × ${w} = <b>${step1}</b>`
      : `Height × Width = ${h} × ${w} = <b>${step1}</b>`

    // Шаг 2: Площадь × Цена за единицу
    const price = pricePerUnit[materialType]
    const step2 = step1 * price
    const materialName = language === 'ru'
      ? materialType === 'standard' ? 'Стандарт' : materialType === 'premium' ? 'Премиум' : 'Люкс'
      : materialType === 'standard' ? 'Standard' : materialType === 'premium' ? 'Premium' : 'Luxury'
    
    const step2Text = language === 'ru'
      ? `${step1} × ${price} (${materialName}) = <b>${step2}</b>`
      : `${step1} × ${price} (${materialName}) = <b>${step2}</b>`

    // Итог
    const total = Math.round(step2)
    setTotalPrice(total)
    setCalculationSteps([
      { step: 1, text: step1Text },
      { step: 2, text: step2Text },
    ])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.calculatorTitle}</h2>
      <p className="text-gray-600 mb-8">{t.calculatorSubtitle}</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ru' ? 'Высота' : 'Height'}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 rounded-lg"
            placeholder={language === 'ru' ? 'Высота' : 'Height'}
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ru' ? 'Ширина' : 'Width'}
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full px-4 py-2 rounded-lg"
            placeholder={language === 'ru' ? 'Ширина' : 'Width'}
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t.materialType}
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setMaterialType('standard')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                materialType === 'standard'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="font-semibold">{language === 'ru' ? 'Стандарт' : 'Standard'}</div>
              <div className="text-sm mt-1">35$</div>
            </button>
            <button
              type="button"
              onClick={() => setMaterialType('premium')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                materialType === 'premium'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="font-semibold">{language === 'ru' ? 'Премиум' : 'Premium'}</div>
              <div className="text-sm mt-1">45$</div>
            </button>
            <button
              type="button"
              onClick={() => setMaterialType('lux')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                materialType === 'lux'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="font-semibold">{language === 'ru' ? 'Люкс' : 'Luxury'}</div>
              <div className="text-sm mt-1">55$</div>
            </button>
          </div>
        </div>

        <button
          onClick={calculatePrice}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          {language === 'ru' ? 'Рассчитать' : 'Calculate'}
        </button>

        {calculationSteps && totalPrice !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary-50 rounded-lg p-6"
          >
            <div className="space-y-3 mb-4">
              {calculationSteps.map((calc, index) => (
                <p
                  key={index}
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: calc.text }}
                />
              ))}
            </div>
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 mb-2">{t.totalPrice}</p>
              <p className="text-4xl font-bold text-primary-600">
                {totalPrice.toLocaleString()} {language === 'ru' ? 'сом' : 'som'}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Calculator






