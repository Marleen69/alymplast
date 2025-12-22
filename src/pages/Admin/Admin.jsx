import React, { useState, useEffect } from 'react';
import { products as initialProducts } from '../../data/products';
import { initialTeam } from '../../data/team'; 
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [isAuthorized, setIsAuthorized] = useState(false); // Состояние авторизации
  const [passwordInput, setPasswordInput] = useState(''); // Для ввода пароля

  // --- ЛОГИКА АВТОРИЗАЦИИ ---
  useEffect(() => {
    const adminToken = localStorage.getItem('admin_access');
    if (adminToken === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Установи свой пароль здесь (например: alym777)
    if (passwordInput === 'alym777') {
      localStorage.setItem('admin_access', 'true');
      setIsAuthorized(true);
    } else {
      alert('Неверный пароль!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_access');
    setIsAuthorized(false);
    navigate('/'); // Редирект на главную при выходе
  };

  // --- ТВОЯ ЛОГИКА ТОВАРОВ ---
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('site_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'windows',
    price: '',
    inStock: true
  });

  // --- ТВОЯ ЛОГИКА КОМАНДЫ ---
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('site_team');
    return saved ? JSON.parse(saved) : initialTeam;
  });

  useEffect(() => {
    localStorage.setItem('site_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('site_team', JSON.stringify(team));
  }, [team]);

  const toggleStock = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  const deleteProduct = (id) => {
    if(window.confirm('Удалить этот товар навсегда?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const id = Date.now();
    setProducts([...products, { ...newProduct, id }]);
    setNewProduct({ name: '', category: 'windows', price: '', inStock: true });
    alert('Товар добавлен!');
  };

  const updateMember = (id, field, value) => {
    setTeam(team.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  // --- ЭКРАН ВХОДА ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-800">ALIM<span className="text-blue-600">PLAST</span></h2>
            <p className="text-gray-500 text-sm mt-2">Вход в панель администратора</p>
          </div>
          <div className="space-y-4">
            <input 
              type="password" 
              placeholder="Введите пароль" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center text-xl tracking-widest"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
              Войти в систему
            </button>
          </div>
          <Link to="/" className="block text-center mt-6 text-gray-400 text-sm hover:text-gray-600 transition">
            Вернуться на сайт
          </Link>
        </form>
      </div>
    );
  }

  // --- ОСНОВНАЯ ПАНЕЛЬ (Показывается только если авторизован) ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Панель управления <span className="text-blue-600 italic underline">AlymPlast</span></h1>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Authorized Session</p>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="hidden md:block bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition border border-gray-200">На сайт</Link>
            <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-100 transition border border-red-100">Выход</button>
          </div>
        </div>

        {/* ПЕРЕКЛЮЧАТЕЛЬ ВКЛАДОК */}
        <div className="flex space-x-2 mb-8 bg-gray-200 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'products' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-300'}`}
          >
            📦 Товары
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'team' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-300'}`}
          >
            👥 Команда
          </button>
        </div>

        {/* ВКЛАДКА ТОВАРОВ */}
        {activeTab === 'products' && (
          <>
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h2 className="text-xl font-bold mb-4 text-blue-600">Добавить новый товар</h2>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input 
                  type="text" placeholder="Название" 
                  className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required
                  value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
                <select 
                  className="border p-2 rounded"
                  value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option value="windows">Окна</option>
                  <option value="doors">Двери</option>
                  <option value="akfa">Akfa Special</option>
                  <option value="balconies">Балконы</option>
                </select>
                <input 
                  type="text" placeholder="Цена" 
                  className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required
                  value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                />
                <button className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">Добавить</button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-4">Товар</th>
                    <th className="p-4">Категория</th>
                    <th className="p-4 text-center">Статус</th>
                    <th className="p-4 text-right">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 font-bold">{product.name}</td>
                      <td className="p-4 uppercase text-xs text-gray-500 font-semibold">{product.category}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${product.inStock !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.inStock !== false ? 'В наличии' : 'Скрыт'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => toggleStock(product.id)} className="text-xs font-bold text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                          {product.inStock !== false ? 'Скрыть' : 'Показать'}
                        </button>
                        <button onClick={() => deleteProduct(product.id)} className="text-xs font-bold text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50">
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ВКЛАДКА КОМАНДЫ */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member) => (
              <div key={member.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
                <div className="flex gap-4 mb-4">
                  <img src={member.img} alt="" className="w-24 h-24 rounded-xl object-cover shadow-sm" />
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">ФИО</label>
                      <input 
                        className="w-full font-bold text-gray-800 border-b border-gray-200 focus:border-blue-500 outline-none"
                        value={member.name}
                        onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Должность</label>
                      <input 
                        className="w-full text-blue-600 font-semibold text-sm border-b border-gray-200 focus:border-blue-500 outline-none"
                        value={member.role}
                        onChange={(e) => updateMember(member.id, 'role', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Описание</label>
                    <textarea 
                      className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-2 h-20 focus:border-blue-500 outline-none transition"
                      value={member.desc}
                      onChange={(e) => updateMember(member.id, 'desc', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Ссылка на фото (URL)</label>
                    <input 
                      className="w-full text-[10px] text-gray-400 italic border-b border-gray-100 focus:outline-none"
                      value={member.img}
                      onChange={(e) => updateMember(member.id, 'img', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-center mt-12 text-gray-400 text-xs italic">AlymPlast Admin System • v2.1</p>
    </div>
  );
};

export default Admin;