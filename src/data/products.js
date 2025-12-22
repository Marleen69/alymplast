export const products = [
  // --- OKHA (windows) ---
  {
    id: 1,
    name_ru: "Пластиковое окно Premium",
    name_en: "Premium Plastic Window",
    price: 12000,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    model3d: "/models/window.glb",
    description_ru: "Высококачественное пластиковое окно с энергосберегающим стеклопакетом.",
    description_en: "High-quality plastic window with energy-saving double glazing.",
    category: "windows",
    inStock: true
  },
  {
    id: 2,
    name_ru: "Окно Эко-Пласт 60",
    name_en: "Eco-Plast 60 Window",
    price: 9500,
    img: "https://avatars.mds.yandex.net/i?id=f9545f973bcb7059862c019ff5252cfb2e5e8357-8318446-images-thumbs&n=13w=400",
    description_ru: "Экономичное решение для квартир. Надежный профиль.",
    description_en: "Economical solution for apartments. Reliable profile.",
    category: "windows",
    inStock: true
  },
  { id: 3, name_ru: "Окно Rehau Delight", name_en: "Rehau Delight Window", price: 14000, img: "https://images.unsplash.com/photo-1503708995433-f159ed45233e?w=800", description_ru: "Больше света благодаря заниженной высоте профиля.", description_en: "More light due to the reduced profile height.", category: "windows", inStock: true },
  { id: 4, name_ru: "Окно с защитой от детей", name_en: "Window with Child Lock", price: 11000, img: "https://images.unsplash.com/photo-1527359443443-84a48abc7df8?w=800", description_ru: "Безопасное окно со специальным замком.", description_en: "Safe window with a special lock.", category: "windows", inStock: true },
  { id: 5, name_ru: "Тонированное окно", name_en: "Tinted Window", price: 13000, img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800", description_ru: "Защита от солнечных лучей и посторонних глаз.", description_en: "Protection from sunlight and prying eyes.", category: "windows", inStock: true },
  { id: 6, name_ru: "Окно Арктик (утепленное)", name_en: "Arctic Window (Insulated)", price: 15500, img: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800", description_ru: "Для суровых зим с тройным контуром уплотнения.", description_en: "For harsh winters with a triple sealing circuit.", category: "windows", inStock: true },
  { id: 7, name_ru: "Окно Ламинация Дуб", name_en: "Oak Laminated Window", price: 14500, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", description_ru: "Стильная отделка под натуральное дерево.", description_en: "Stylish finish under natural wood.", category: "windows", inStock: true },
  { id: 8, name_ru: "Окно Ламинация Антрацит", name_en: "Anthracite Window", price: 14500, img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800", description_ru: "Современный темный цвет для стиля хай-тек.", description_en: "Modern dark color for high-tech style.", category: "windows", inStock: true },
  { id: 9, name_ru: "Окно со шпросами", name_en: "Window with Georgian Bars", price: 12800, img: "https://images.unsplash.com/photo-1582234372131-03977536965b?w=800", description_ru: "Классический дизайн с декоративной решеткой.", description_en: "Classic design with a decorative grid.", category: "windows", inStock: true },
  { id: 10, name_ru: "Панорамное окно XL", name_en: "Panoramic Window XL", price: 19000, img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800", description_ru: "Максимальный обзор и освещение.", description_en: "Maximum view and lighting.", category: "windows", inStock: true },
  { id: 11, name_ru: "Арочное окно", name_en: "Arched Window", price: 17000, img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800", description_ru: "Индивидуальная форма для вашего дома.", description_en: "Individual shape for your home.", category: "windows", inStock: true },
  { id: 12, name_ru: "Окно для кухни (узкое)", name_en: "Kitchen Window (Narrow)", price: 8000, img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800", description_ru: "Компактное окно для проветривания.", description_en: "Compact window for ventilation.", category: "windows", inStock: true },

  // --- ДВЕРИ (doors) ---
  {
    id: 13,
    name_ru: "Пластиковая дверь Standard",
    name_en: "Standard Plastic Door",
    price: 8500,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    model3d: "/models/door.glb",
    description_ru: "Надежная пластиковая дверь с современным дизайном.",
    description_en: "Reliable plastic door with modern design.",
    category: "doors",
    inStock: true
  },
  {
    id: 14,
    name_ru: "Входная дверь Security",
    name_en: "Security Entrance Door",
    price: 22000,
    img: "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?w=800",
    description_ru: "Усиленная входная дверь с многоточечным запиранием.",
    description_en: "Reinforced entrance door with multi-point locking.",
    category: "doors",
    inStock: true
  },
  { id: 15, name_ru: "Офисная дверь Белая", name_en: "Office Door White", price: 9500, img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800", description_ru: "Лаконичный дизайн для бизнеса.", description_en: "Simple design for business.", category: "doors", inStock: true },
  { id: 16, name_ru: "Дверь со стеклом (матовая)", name_en: "Door with Frosted Glass", price: 11500, img: "https://images.unsplash.com/photo-1506318137071-a8e063b4b6a1?w=800", description_ru: "Пропускает свет, но скрывает детали.", description_en: "Lets light in but hides details.", category: "doors", inStock: true },
  { id: 17, name_ru: "Дверь с сэндвич-панелью", name_en: "Sandwich Panel Door", price: 9000, img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800", description_ru: "Теплая и глухая дверь для подсобных помещений.", description_en: "Warm and solid door for utility rooms.", category: "doors", inStock: true },
  { id: 18, name_ru: "Дверь Балконная Классик", name_en: "Balcony Door Classic", price: 10500, img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?w=800", description_ru: "Стандартная дверь для выхода на балкон.", description_en: "Standard door for balcony access.", category: "doors", inStock: true },
  { id: 19, name_ru: "Дверь Цвет Золотой Дуб", name_en: "Golden Oak Door", price: 13500, img: "https://images.unsplash.com/photo-1513584684374-8bdb74c9efbd?w=800", description_ru: "Имитация дорогого дерева.", description_en: "Imitation of expensive wood.", category: "doors", inStock: true },
  { id: 20, name_ru: "Дверь с витражом", name_en: "Stained Glass Door", price: 25000, img: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?w=800", description_ru: "Эксклюзивный декор для главного входа.", description_en: "Exclusive decor for the main entrance.", category: "doors", inStock: true },
  { id: 21, name_ru: "Межкомнатная ПВХ-дверь", name_en: "Interior PVC Door", price: 7500, img: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800", description_ru: "Легкая и влагостойкая.", description_en: "Lightweight and moisture resistant.", category: "doors", inStock: true },
  { id: 22, name_ru: "Дверь с фрамугой", name_en: "Door with Transom", price: 18000, img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800", description_ru: "Для высоких дверных проемов.", description_en: "For high doorways.", category: "doors", inStock: true },
  { id: 23, name_ru: "Дверь Распашная Двойная", name_en: "Double Swing Door", price: 21000, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", description_ru: "Широкий проход для магазинов и офисов.", description_en: "Wide passage for shops and offices.", category: "doors", inStock: true },
  { id: 24, name_ru: "Дверь с алюминиевым порогом", name_en: "Alumni Threshold Door", price: 12000, img: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800", description_ru: "Повышенная износостойкость порога.", description_en: "Increased wear resistance of the threshold.", category: "doors", inStock: true },
  { id: 25, name_ru: "Дверь Махагон", name_en: "Mahogany Door", price: 14000, img: "https://images.unsplash.com/photo-1615873968403-89e068629275?w=800", description_ru: "Насыщенный темный цвет.", description_en: "Rich dark color.", category: "doors", inStock: true },

  // --- AKFA ---
  { id: 26, name_ru: "Akfa Quattro 4-камерный", name_en: "Akfa Quattro 4-chamber", price: 15000, img: "https://images.unsplash.com/photo-1503708995433-f159ed45233e?w=800", description_ru: "Оригинальный профиль Akfa. Идеальный баланс цены и качества.", description_en: "Original Akfa profile.", category: "akfa", inStock: true },
  { id: 27, name_ru: "Akfa Engelberg 76", name_en: "Akfa Engelberg 76", price: 28000, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800", description_ru: "Элитная серия Akfa Engelberg.", description_en: "Elite series Akfa Engelberg.", category: "akfa", inStock: true },
  { id: 28, name_ru: "Akfa Comfort", name_en: "Akfa Comfort", price: 11000, img: "https://images.unsplash.com/photo-1527359443443-84a48abc7df8?w=800", description_ru: "Классическая система Akfa.", description_en: "Classic Akfa system.", category: "akfa", inStock: true },
  { id: 29, name_ru: "Akfa 6000 Series", name_en: "Akfa 6000 Series", price: 12500, img: "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?w=800", description_ru: "Надежная система для жаркого климата.", description_en: "Reliable system.", category: "akfa", inStock: true },
  { id: 30, name_ru: "Akfa 7000 Series", name_en: "Akfa 7000 Series", price: 14000, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", description_ru: "Улучшенная звукоизоляция.", description_en: "Improved sound insulation.", category: "akfa", inStock: true },
  { id: 35, name_ru: "Akfa Wood Look", name_en: "Akfa Wood Look", price: 17000, img: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800", description_ru: "Внешний вид дерева.", description_en: "Wood look profile.", category: "akfa", inStock: true },
  { id: 37, name_ru: "Akfa Panorama", name_en: "Akfa Panorama", price: 22000, img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800", description_ru: "Окна большого размера.", description_en: "Large sized windows.", category: "akfa", inStock: true },

  // --- РАЗДВИЖНЫЕ СИСТЕМЫ (sliding) ---
  {
    id: 39,
    name_ru: "Раздвижная система Premium",
    name_en: "Premium Sliding System",
    price: 25000,
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    description_ru: "Современная раздвижная система для больших проемов.",
    description_en: "Modern sliding system.",
    category: "sliding",
    inStock: true
  },
  { id: 40, name_ru: "Портал Сдвижной", name_en: "Sliding Portal", price: 35000, img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800", description_ru: "Огромные раздвижные двери для террасы.", description_en: "Huge sliding doors.", category: "sliding", inStock: true },

  // --- БАЛКОНЫ (balconies) ---
  {
    id: 45,
    name_ru: "Балконный блок Lux",
    name_en: "Lux Balcony Block",
    price: 18000,
    img: "https://images.unsplash.com/photo-1597218868981-1b68e15f0065?w=800",
    description_ru: "Премиум балконный блок с панорамным остеклением.",
    description_en: "Premium balcony block.",
    category: "balconies",
    inStock: true
  },
  
  // --- ДОБАВЛЕННЫЙ ТОВАР ИЗ СКРИНШОТА ---
  {
    id: 51,
    name_ru: "Окно с москитной сеткой",
    name_en: "Window with Mosquito Net",
    price: 13500,
    img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
    description_ru: "Пластиковое окно со встроенной москитной сеткой. Защита от насекомых без потери комфорта.",
    description_en: "Plastic window with built-in mosquito net.",
    category: "windows",
    material_ru: "Пластик премиум",
    warranty_ru: "5 лет",
    inStock: true
  }
];

// --- ФУНКЦИИ ПОИСКА И ФИЛЬТРАЦИИ ---

/**
 * Получить один товар по ID
 */
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

/**
 * Универсальный поиск и фильтр
 * Поддерживает: категорию, текстовый поиск, диапазон цен
 */
export const getFilteredProducts = ({ category, search, minPrice, maxPrice }) => {
  return products.filter(product => {
    // Фильтр по категории
    const matchCategory = !category || product.category === category;
    
    // Поиск по названию (на русском и английском)
    const matchSearch = !search || 
      product.name_ru.toLowerCase().includes(search.toLowerCase()) ||
      product.name_en.toLowerCase().includes(search.toLowerCase());
      
    // Фильтр по минимальной цене
    const matchMinPrice = !minPrice || product.price >= parseFloat(minPrice);
    
    // Фильтр по максимальной цене
    const matchMaxPrice = !maxPrice || product.price <= parseFloat(maxPrice);

    return matchCategory && matchSearch && matchMinPrice && matchMaxPrice;
  });
};

/**
 * Получить товары только по категории
 */
export const getProductsByCategory = (category) => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};