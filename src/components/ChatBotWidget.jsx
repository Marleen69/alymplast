import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const { language } = useLanguage()
  const t = translations[language]

  // Номер и ссылка WhatsApp
  const whatsappNumber = "996505200091"
  const openWhatsApp = (text = "Здравствуйте! У меня вопрос по продукции.") => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank')
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        text: translations[language].chatbotGreeting,
        sender: 'bot',
      }])
    }
  }, [isOpen, language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Главная функция логики
  const processChat = (text) => {
    if (!text.trim()) return

    const userMsg = { id: Date.now(), text: text.trim(), sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInputValue('')

    setTimeout(() => {
      const responses = {
        ru: {
          'услуг': 'Мы устанавливаем окна AKFA, двери и витражи с гарантией 5 лет.',
          'доставк': 'Доставка по Бишкеку бесплатная при заказе от 50 000 сом.',
          'гаранти': 'На все наши изделия действует официальная гарантия качества.',
          'заказ': 'Для заказа напишите нам в WhatsApp или оставьте контакты здесь.'
        },
        en: {
          'service': 'We install AKFA windows and doors with a 5-year warranty.',
          'delivery': 'Free delivery in Bishkek for orders over 50,000 som.'
        }
      }

      const input = text.toLowerCase()
      let reply = language === 'ru' 
        ? 'Наш менеджер ответит вам быстрее в WhatsApp. Нажать?' 
        : 'Our manager can assist you faster via WhatsApp. Connect?'

      for (const [key, val] of Object.entries(responses[language])) {
        if (input.includes(key)) { reply = val; break; }
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }])
    }, 600)
  }

  return (
    <>
      {/* Кнопка открытия чата (иконка сообщения) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-colors hover:bg-blue-700"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold text-sm uppercase tracking-wider">{t.chatbotTitle}</span>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {/* Блок действий: Кнопки + WhatsApp */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex flex-wrap gap-2">
                  {t.chatbotOptions?.map((opt, i) => (
                    <button key={i} onClick={() => processChat(opt)} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[11px] font-medium hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm">
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Единая кнопка WhatsApp внутри чата */}
                <button 
                  onClick={() => openWhatsApp()}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-2xl text-xs font-bold hover:bg-[#128c7e] transition-all shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  <span>Написать в WhatsApp</span>
                </button>
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && processChat(inputValue)}
                  placeholder="..."
                  className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={() => processChat(inputValue)} className="bg-blue-600 text-white p-2 rounded-xl">
                   <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBotWidget