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
  const [totalPriceSom, setTotalPriceSom] = useState(null)

  const calculatePrice = () => {
    if (!width || !height) {
      alert(language === 'ru' ? 'Заполните все поля' : 'Fill in all fields')
      return
    }

    const w = parseFloat(width) || 0
    const h = parseFloat(height) || 0
    const exchangeRate = 89 // Курс доллара к сому

    // Цена за 1 м² в долларах
    const pricePerUnit = {
      standard: 35,
      premium: 45,
      lux: 55,
    }

    // 1. Считаем площадь в м²
    const area = (w * h) / 10000
    const areaFormatted = area.toFixed(2)

    // 2. Считаем цену в долларах
    const priceUsd = pricePerUnit[materialType]
    const totalUsd = area * priceUsd

    // 3. Переводим в сомы
    const totalSom = Math.round(totalUsd * exchangeRate)

    const materialName = language === 'ru'
      ? materialType === 'standard' ? 'Стандарт' : materialType === 'premium' ? 'Премиум' : 'Люкс'
      : materialType === 'standard' ? 'Standard' : materialType === 'premium' ? 'Premium' : 'Luxury'

    // Текст шагов (в долларах, как ты просил)
    const step1Text = language === 'ru' 
      ? `Площадь: ${h}см × ${w}см = <b>${areaFormatted} м²</b>`
      : `Area: ${h}cm × ${w}cm = <b>${areaFormatted} m²</b>`

    const step2Text = language === 'ru'
      ? `${areaFormatted} м² × ${priceUsd}$ (${materialName}) = <b>${totalUsd.toFixed(2)}$</b>`
      : `${areaFormatted} m² × ${priceUsd}$ (${materialName}) = <b>${totalUsd.toFixed(2)}$</b>`

    setTotalPriceSom(totalSom)
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
            {language === 'ru' ? 'Высота (см)' : 'Height (cm)'}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600 outline-none"
            placeholder={language === 'ru' ? 'Высота' : 'Height'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'ru' ? 'Ширина (см)' : 'Width (cm)'}
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600 outline-none"
            placeholder={language === 'ru' ? 'Ширина' : 'Width'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t.materialType}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['standard', 'premium', 'lux'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setMaterialType(type)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  materialType === type
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="font-semibold">
                  {type === 'standard' ? (language === 'ru' ? 'Китай' : 'Standard') : 
                   type === 'premium' ? (language === 'ru' ? 'Туретский' : 'Premium') : 
                   (language === 'ru' ? 'Узбекский' : 'Luxury')}
                </div>
                {/* <div className="text-sm mt-1">
                  {type === 'standard' ? '35$' : type === 'premium' ? '45$' : '55$'}
                </div> */}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={calculatePrice}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          {language === 'ru' ? 'Рассчитать' : 'Calculate'}
        </button>

        {calculationSteps && totalPriceSom !== null && (
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
            <div className="text-center pt-4 border-t border-primary-100">
              <p className="text-sm text-gray-600 mb-2">{t.totalPrice}</p>
              <p className="text-4xl font-bold text-primary-600">
                {totalPriceSom.toLocaleString()} {language === 'ru' ? 'сом' : 'som'}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Calculator