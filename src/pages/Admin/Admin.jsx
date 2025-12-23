import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { products as initialProducts } from '../../data/products';
import { initialTeam } from '../../data/team';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [hasChanges, setHasChanges] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Безопасная загрузка продуктов
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('site_products');
      const parsed = saved ? JSON.parse(saved) : initialProducts;
      // Фильтруем сразу при загрузке, чтобы убрать возможный null или undefined
      return Array.isArray(parsed) ? parsed.filter(p => p && typeof p === 'object') : initialProducts;
    } catch (e) { 
      return initialProducts; 
    }
  });

  const [team, setTeam] = useState(() => {
    try {
      const saved = localStorage.getItem('site_team');
      const parsed = saved ? JSON.parse(saved) : initialTeam;
      return Array.isArray(parsed) ? parsed.filter(t => t && typeof t === 'object') : initialTeam;
    } catch (e) { 
      return initialTeam; 
    }
  });

  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    category: 'windows', 
    price: '', 
    inStock: true, 
    image: '' 
  });

  useEffect(() => {
    if (localStorage.getItem('admin_access') === 'true') setIsAuthorized(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
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
    navigate('/');
  };

  // ИСПРАВЛЕННЫЙ ФИЛЬТР (Устранение ошибки toLowerCase)
  const filteredProducts = (products || []).filter(p => {
    if (!p || !p.name) return false; // Пропускаем «битые» объекты без имени
    const name = String(p.name).toLowerCase();
    const query = (searchQuery || "").toLowerCase();
    return name.includes(query);
  });

  const handleSaveAll = () => {
    localStorage.setItem('site_products', JSON.stringify(products));
    localStorage.setItem('site_team', JSON.stringify(team));
    setHasChanges(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ИСПРАВЛЕННОЕ ДОБАВЛЕНИЕ (Защита от пустых данных)
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.name.trim()) {
        alert("Введите название товара!");
        return;
    }
    
    const productObj = { 
      ...newProduct, 
      id: Date.now(),
      name: newProduct.name.trim() 
    };

    setProducts([productObj, ...products]);
    setNewProduct({ name: '', category: 'windows', price: '', inStock: true, image: '' });
    setHasChanges(true);
  };

  const handleImageUpload = (e, target, isNewProduct = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isNewProduct) {
          setNewProduct({ ...newProduct, image: reader.result });
        } else {
          setTeam(team.map(t => t.id === target ? { ...t, img: reader.result } : t));
        }
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 font-sans">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center">
          <h2 className="text-3xl font-black text-slate-800 mb-2">ALIM<span className="text-blue-600">PLAST</span></h2>
          <p className="text-gray-400 mb-8 text-sm uppercase tracking-widest font-bold">Admin Panel</p>
          <input 
            type="password" 
            placeholder="Пароль" 
            className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-3xl mb-4 text-center text-2xl outline-none focus:border-blue-500 transition-all" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)} 
            autoFocus 
          />
          <button className="w-full bg-blue-600 text-white font-bold py-5 rounded-3xl hover:bg-blue-700 transition-all">Войти</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32 font-sans text-slate-900">
      <header className="bg-white border-b sticky top-0 z-40 p-4 md:px-10 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Alim<span className="text-blue-600">Plast</span></h1>
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition">На сайт</Link>
          <button onClick={handleLogout} className="bg-red-50 text-red-500 px-5 py-2.5 rounded-2xl text-xs font-black hover:bg-red-500 hover:text-white transition-all uppercase tracking-wider">Выйти</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-10">
        <div className="flex bg-slate-200/50 backdrop-blur p-1.5 rounded-3xl w-fit mb-12 shadow-inner border border-slate-200">
          <button onClick={() => setActiveTab('products')} className={`px-10 py-3.5 rounded-[1.25rem] font-black text-sm transition-all duration-300 ${activeTab === 'products' ? 'bg-white text-blue-600 shadow-xl scale-105' : 'text-slate-500 hover:text-slate-800'}`}>📦 ТОВАРЫ</button>
          <button onClick={() => setActiveTab('team')} className={`px-10 py-3.5 rounded-[1.25rem] font-black text-sm transition-all duration-300 ${activeTab === 'team' ? 'bg-white text-blue-600 shadow-xl scale-105' : 'text-slate-500 hover:text-slate-800'}`}>👥 КОМАНДА</button>
        </div>

        {activeTab === 'products' ? (
          <div className="space-y-10">
            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { label: 'Всего', val: products.length, color: 'text-slate-800' },
                { label: 'В наличии', val: products.filter(p => p?.inStock).length, color: 'text-emerald-500' },
                { label: 'Скрыто', val: products.filter(p => !p?.inStock).length, color: 'text-rose-500' },
                { label: 'Найдено', val: filteredProducts.length, color: 'text-blue-600' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className={`text-4xl font-black ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>

            {/* ADD FORM */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              <h3 className="font-black text-slate-800 mb-8 text-2xl flex items-center gap-3">
                <span className="bg-blue-600 text-white p-2 rounded-xl text-sm">＋</span> Добавить новый продукт
              </h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Название</label>
                    <input type="text" placeholder="Напр: Окно Akfa 120x150" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 border border-slate-100 text-slate-900" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Категория</label>
                    <select className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 appearance-none text-slate-900" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                        <option value="windows">Окна</option>
                        <option value="doors">Двери</option>
                        <option value="akfa">Akfa Special</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Цена</label>
                    <input type="text" placeholder="Напр: 150 000 сум" className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 text-slate-900" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                </div>

                <div className="lg:col-span-2 space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase ml-2">Фото (Ссылка или Файл)</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1 group">
                            <input 
                                type="text" 
                                placeholder="Вставьте ссылку на фото или нажмите скрепку →" 
                                className="w-full p-4 bg-blue-50/50 rounded-2xl outline-none border-2 border-blue-100 focus:border-blue-400 transition-all text-blue-600 font-medium pr-14"
                                value={newProduct.image} 
                                onChange={e => setNewProduct({...newProduct, image: e.target.value})} 
                            />
                            <label className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-white text-blue-600 rounded-xl shadow-sm hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                                📎
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, null, true)} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex items-end">
                    <button className="w-full bg-slate-900 text-white font-black rounded-2xl py-4 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1">СОЗДАТЬ ТОВАР</button>
                </div>
              </form>
            </div>

            {/* LIST */}
            <div className="grid gap-4">
              <div className="relative mb-4">
                  <input type="text" placeholder="Быстрый поиск по списку..." className="w-full p-5 pl-14 bg-white rounded-3xl shadow-sm border border-slate-100 outline-none focus:ring-4 focus:ring-blue-50 text-slate-900" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
              </div>
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-white p-5 rounded-[2.5rem] flex justify-between items-center shadow-sm border border-slate-50 hover:border-blue-100 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] overflow-hidden flex items-center justify-center border border-slate-100 shadow-inner">
                        {p.image ? <img src={p.image} className="w-full h-full object-cover" alt="" /> : <span className="text-3xl">🪟</span>}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-xl">{p.name}</h4>
                      <p className="text-[11px] font-black text-blue-500 uppercase bg-blue-50 w-fit px-3 py-1 rounded-lg mt-1 tracking-widest">{p.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] font-black text-slate-300 uppercase">Цена</p>
                        <p className="font-black text-slate-700">{p.price || 'Договорная'}</p>
                    </div>
                    <button onClick={() => { setProducts(products.map(x => x.id === p.id ? {...x, inStock: !x.inStock} : x)); setHasChanges(true); }} className={`text-[11px] font-black px-5 py-2.5 rounded-2xl transition-all ${p.inStock ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white'}`}>{p.inStock ? 'АКТИВЕН' : 'СКРЫТ'}</button>
                    <button onClick={() => { if(window.confirm('Удалить этот товар?')) { setProducts(products.filter(x => x.id !== p.id)); setHasChanges(true); } }} className="bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all">🗑</button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && <p className="text-center text-slate-400 font-bold py-10 italic">Ничего не найдено...</p>}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {team.map(m => (
              <div key={m.id} className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-50 group transition-all hover:shadow-xl">
                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                  <div className="relative w-32 h-32 flex-shrink-0 mx-auto sm:mx-0">
                    <img src={m.img} className="w-full h-full rounded-[2.5rem] object-cover shadow-2xl border-4 border-white" alt="" />
                    <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      📸
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, m.id)} />
                    </label>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-300 uppercase ml-1">Имя</p>
                        <input className="w-full font-black text-2xl text-slate-800 outline-none border-b-2 border-transparent focus:border-blue-500 transition-all" value={m.name} onChange={e => { setTeam(team.map(t => t.id === m.id ? {...t, name: e.target.value} : t)); setHasChanges(true); }} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-300 uppercase ml-1">Ссылка на фото</p>
                        <input className="w-full text-[11px] text-blue-500 bg-blue-50/50 px-4 py-2 rounded-xl outline-none border border-blue-100/50" value={m.img} onChange={e => { setTeam(team.map(t => t.id === m.id ? {...t, img: e.target.value} : t)); setHasChanges(true); }} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-300 uppercase ml-4">О сотруднике</p>
                    <textarea className="w-full text-sm leading-relaxed text-slate-500 bg-slate-50/50 p-7 rounded-[2.5rem] h-32 outline-none resize-none focus:bg-white focus:ring-2 focus:ring-blue-50 border border-transparent focus:border-blue-100 transition-all" value={m.desc} onChange={e => { setTeam(team.map(t => t.id === m.id ? {...t, desc: e.target.value} : t)); setHasChanges(true); }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${hasChanges ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-90 pointer-events-none'}`}>
        <button onClick={handleSaveAll} className="bg-slate-900 text-white px-16 py-7 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] font-black text-xl flex items-center gap-5 hover:bg-blue-600 transition-all">
          <span className="text-2xl">💾</span> СОХРАНИТЬ ИЗМЕНЕНИЯ
        </button>
      </div>

      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-white border-2 border-emerald-500 text-emerald-600 px-12 py-5 rounded-[2rem] shadow-2xl z-[60] font-black flex items-center gap-3 animate-in fade-in zoom-in">
          <span className="bg-emerald-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-[10px]">✓</span> 
          ДАННЫЕ ОБНОВЛЕНЫ
        </div>
      )}
    </div>
  );
};

export default Admin;