import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import Map from '../components/Map'

const Contacts = () => {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // --- НАСТРОЙКИ TELEGRAM (Я ВСЁ ИСПРАВИЛ) ---
    const TELEGRAM_BOT_TOKEN = '8563559964:AAGpgBzBS6P7g2JGJkoEe4kBtD7wLQOhpBk'
    const TELEGRAM_CHAT_ID = '6583882083'
    const API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    // Формирование текста сообщения
    const messageText = `
<b>🚀 Новая заявка с сайта!</b>
👤 <b>Имя:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
📞 <b>Телефон:</b> ${formData.phone}
💬 <b>Сообщение:</b> ${formData.message}
    `

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: 'HTML',
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        alert('Ошибка при отправке. Проверьте правильность токена бота.')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Произошла ошибка соединения с сервером Telegram.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t.contactsTitle}
          </h1>
          <p className="text-xl text-gray-600">{t.contactsSubtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'ru' ? 'Контактная информация' : 'Contact Information'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.address}</h3>
                  <p className="text-lg text-gray-900">
                    {language === 'ru'
                      ? 'г. Бишкек, Старый толчок, Улица Орозбекова, 287а'
                      : 'Bishkek, Stary tolchok, Orozbekova St., 291v'}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.phone}</h3>
                  <a href="tel:+996505200091" className="text-lg text-primary-600 hover:text-primary-700 font-bold">
                    +996 505 200 091
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.email}</h3>
                  <a href="mailto:info@alymplast.ru" className="text-lg text-primary-600 hover:text-primary-700">
                    info@alymplast.ru
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t.workingHours}</h3>
                  <p className="text-lg text-gray-900">{t.workingHoursValue}</p>
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'ru' ? 'Как нас найти' : 'How to Find Us'}
              </h2>
              <Map />
            </div>
          </motion.div>

          {/* Форма контактов */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'ru' ? 'Отправить сообщение' : 'Send Message'}
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 rounded-lg p-6 text-center"
                >
                  <p className="text-green-800 font-semibold text-lg">
                    {t.formSuccess || 'Сообщение успешно отправлено!'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.formName}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={language === 'ru' ? "Как к вам обращаться?" : "Your name"}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.formEmail}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="example@mail.com"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.formPhone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={language === 'ru' ? "+996 ___ __ __ __" : "Your phone number"}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.formMessage}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder={language === 'ru' ? "Опишите ваш вопрос или какие окна вас интересуют..." : "How can we help you?"}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (language === 'ru' ? 'Отправка...' : 'Sending...') : t.formSend}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contacts