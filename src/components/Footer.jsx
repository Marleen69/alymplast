import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

const Footer = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">AlymPlast</h3>
            <p className="text-gray-400 mb-4">
              {language === 'ru'
                ? 'Премиум пластиковые окна и двери для вашего дома'
                : 'Premium plastic windows and doors for your home'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {language === 'ru' ? 'Быстрые ссылки' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-primary-400 transition-colors">
                  {t.catalog}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-primary-400 transition-colors">
                  {t.contacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t.contacts}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400">{t.address}:</span>
                <br />
                <span className="text-white">
                  {language === 'ru'
                    ? 'г. Бишкек, Старый толчок, Улица Орозбекова, 291в'
                    : 'Bishkek, Stary tolchok, Orozbekova St., 291v'}
                </span>
              </li>
              <li>
                <span className="text-gray-400">{t.phone}:</span>{' '}
                <span className="text-white">+996 505 200 091</span>
              </li>
              <li>
                <span className="text-gray-400">{t.email}:</span>{' '}
                <span className="text-white">info@alymplast.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © {t.footerYear} {t.footerCompany}. {t.footerRights}.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer






