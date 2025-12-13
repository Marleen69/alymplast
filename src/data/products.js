export const products = [
  {
    id: 1,
    name_ru: "Пластиковое окно Premium",
    name_en: "Premium Plastic Window",
    price: 12000,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    model3d: "/models/window.glb",
    description_ru: "Высококачественное пластиковое окно с энергосберегающим стеклопакетом. Отличная звукоизоляция и теплоизоляция.",
    description_en: "High-quality plastic window with energy-saving double glazing. Excellent sound and thermal insulation.",
    category: "windows"
  },
  {
    id: 2,
    name_ru: "Пластиковая дверь Standard",
    name_en: "Standard Plastic Door",
    price: 8500,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    model3d: "/models/door.glb",
    description_ru: "Надежная пластиковая дверь с современным дизайном. Устойчива к погодным условиям.",
    description_en: "Reliable plastic door with modern design. Weather resistant.",
    category: "doors"
  },
  {
    id: 3,
    name_ru: "Балконный блок Lux",
    name_en: "Lux Balcony Block",
    price: 18000,
    img: "https://khabarovsk.vsevdom.info/media/original/6c/6c71dbca8c03d406d61e39847c46fec634b59dee.jpeg",
    model3d: "/models/balcony.glb",
    description_ru: "Премиум балконный блок с панорамным остеклением. Максимальное естественное освещение.",
    description_en: "Premium balcony block with panoramic glazing. Maximum natural light.",
    category: "balconies"
  },
  {
    id: 4,
    name_ru: "Раздвижная система Premium",
    name_en: "Premium Sliding System",
    price: 25000,
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    model3d: "/models/sliding.glb",
    description_ru: "Современная раздвижная система для больших проемов. Плавное открывание и закрывание.",
    description_en: "Modern sliding system for large openings. Smooth opening and closing.",
    category: "sliding"
  },
  {
    id: 5,
    name_ru: "Окно с москитной сеткой",
    name_en: "Window with Mosquito Net",
    price: 13500,
    img: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800",
    model3d: "/models/window-net.glb",
    description_ru: "Пластиковое окно с встроенной москитной сеткой. Защита от насекомых без потери комфорта.",
    description_en: "Plastic window with built-in mosquito net. Protection from insects without losing comfort.",
    category: "windows"
  },
  {
    id: 6,
    name_ru: "Входная дверь Security",
    name_en: "Security Entrance Door",
    price: 22000,
    img: "https://artokno.ru/files/gallery/660/med/plast-dver1_1609404584.jpg",
    model3d: "/models/entrance-door.glb",
    description_ru: "Усиленная входная дверь с многоточечным запиранием. Максимальная безопасность.",
    description_en: "Reinforced entrance door with multi-point locking. Maximum security.",
    category: "doors"
  }
]

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  if (!category) return products
  return products.filter(product => product.category === category)
}






