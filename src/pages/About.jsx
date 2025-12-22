import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'
import { initialTeam } from '../data/team' // Импорт начальных данных команды

const About = () => {
  const { language } = useLanguage()
  const t = translations[language]

  // ЛОГИКА ДЛЯ КОМАНДЫ (Связь с админкой)
  const [team] = useState(() => {
    const saved = localStorage.getItem('site_team');
    return saved ? JSON.parse(saved) : initialTeam;
  });

  const advantages = [
    t.advantage1,
    t.advantage2,
    t.advantage3,
    t.advantage4,
  ]

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t.aboutTitle}
            </h1>
            <p className="text-xl text-gray-600">{t.aboutSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* History & Akfa Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                История развития и технологии AKFA
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Бренд AKFA начал свою историю в 1998 году, запустив первый завод по производству алюминиевого профиля. К 2004 году компания совершила прорыв, начав массовое производство ПВХ-систем, которые сегодня являются стандартом качества в Центральной Азии.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Сегодня производство AKFA — это полностью автоматизированные линии экструзии. Процесс включает использование высококачественного сырья от мировых лидеров (LG Chem), многоэтапную калибровку профиля и строгий контроль прочности. Мы используем эти технологии, чтобы гарантировать долговечность каждого установленного окна.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t.missionTitle}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.missionText}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Команда (Секция с людьми из админки) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-md" 
                />
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.advantagesTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {advantage}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: '15+',
                label: language === 'ru' ? 'Лет опыта' : 'Years of Experience',
              },
              {
                number: '500+',
                label: language === 'ru' ? 'Довольных клиентов' : 'Happy Clients',
              },
              {
                number: '100%',
                label: language === 'ru' ? 'Гарантия качества' : 'Quality Guarantee',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About