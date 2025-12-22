import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // 1. Загрузка данных из браузера при старте
  useEffect(() => {
    const saved = localStorage.getItem('alym_plast_favs');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Ошибка парсинга избранного", e);
      }
    }
  }, []);

  // 2. Сохранение данных в браузер при каждом изменении списка
  useEffect(() => {
    localStorage.setItem('alym_plast_favs', JSON.stringify(favorites));
  }, [favorites]);

  // Функция добавления/удаления (Toggle)
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      // Проверяем, есть ли уже такой товар в списке по id
      const isExist = prev.find((item) => item.id === product.id);
      
      if (isExist) {
        // Если есть — удаляем
        return prev.filter((item) => item.id !== product.id);
      } else {
        // Если нет — добавляем в начало списка
        return [product, ...prev];
      }
    });
  };

  // Функция проверки: закрашивать сердечко или нет
  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Хук для использования в других файлах
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};