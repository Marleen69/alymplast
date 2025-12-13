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

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = translations[language].chatbotGreeting
      setMessages([
        {
          id: 1,
          text: greeting,
          sender: 'bot',
        },
      ])
    }
  }, [isOpen, language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const messageText = inputValue.trim()
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // Имитация ответа бота
    setTimeout(() => {
      const botResponses = {
        ru: {
          'расскажите о ваших услугах':
            'Мы предлагаем премиум пластиковые окна и двери. У нас широкий выбор продукции с гарантией качества.',
          'какова стоимость доставки?':
            'Стоимость доставки составляет 2000 сом. При заказе от 50000 сом доставка бесплатная.',
          'какие гарантии вы предоставляете?':
            'Мы предоставляем гарантию 5 лет на все наши изделия. Также доступно расширенное гарантийное обслуживание.',
          'как оформить заказ?':
            'Вы можете оформить заказ через наш сайт, позвонив по телефону или посетив наш офис. Мы свяжемся с вами в течение 24 часов.',
        },
        en: {
          'tell me about your services':
            'We offer premium plastic windows and doors. We have a wide selection of products with quality guarantee.',
          'what is the delivery cost?':
            'Delivery cost is 2000 som. Free delivery for orders over 50000 som.',
          'what guarantees do you provide?':
            'We provide a 5-year warranty on all our products. Extended warranty service is also available.',
          'how to place an order?':
            'You can place an order through our website, by phone or by visiting our office. We will contact you within 24 hours.',
        },
      }

      const lowerInput = messageText.toLowerCase()
      let botResponse = ''

      for (const [key, value] of Object.entries(botResponses[language])) {
        if (lowerInput.includes(key.toLowerCase())) {
          botResponse = value
          break
        }
      }

      if (!botResponse) {
        botResponse =
          language === 'ru'
            ? 'Спасибо за ваш вопрос! Наш менеджер свяжется с вами в ближайшее время.'
            : 'Thank you for your question! Our manager will contact you soon.'
      }

      setMessages((prev) => {
        const botMessage = {
          id: prev.length + 2,
          text: botResponse,
          sender: 'bot',
        }
        return [...prev, botMessage]
      })
    }, 1000)
  }

  const handleQuickReply = (option) => {
    setInputValue(option)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-primary-700 transition-colors"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">{t.chatbotTitle}</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {messages.length === 1 && (
                <div className="space-y-2">
                  {t.chatbotOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(option)}
                      className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.chatbotPlaceholder}
                  className="flex-1 px-4 py-2 rounded-lg"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {t.chatbotSend}
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

