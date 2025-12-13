import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../data/translations'

export const useTranslation = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return { t, language }
}






