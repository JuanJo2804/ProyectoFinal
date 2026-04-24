import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartCount } from '../../../utils/cartUtils';
import { useSearch } from '../../../context/SearchContext';

function Header() {
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useSearch();

  // Categorías disponibles
  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'electronics', name: 'Electrónica' },
    { id: 'accessories', name: 'Accesorios' },
  ];

  // Cargar el conteo del carrito al montar el componente
  useEffect(() => {
    // Escuchar cambios en el carrito desde otros componentes
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Buscando:', searchQuery);
    }
  };

  const handleHome = () => {
    setSearchQuery('');
    setSelectedCategory('todos');
    navigate('/gallery');
  };

  const handleCart = () => {
    navigate('/cart');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Primera fila: Logo, buscador y carrito */}
        <div className="flex items-center justify-between gap-6 py-4">

          {/* Botón de Inicio */}
          <button
            onClick={handleHome}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 font-semibold flex-shrink-0"
          >
            🏠 Inicio
          </button>

          {/* Buscador */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl hover:text-blue-600"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Carrito de Compra */}
          <button
            onClick={handleCart}
            className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-2xl flex-shrink-0"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Segunda fila: Categorías */}
        <div className="border-t border-gray-200 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
