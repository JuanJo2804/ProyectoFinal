import { useMemo } from 'react';
import ProductCard from "../../molecules/ProductCard";
import { mockProducts } from "../../../mockdata/mock_products";
import { useSearch } from '../../../context/SearchContext';

function Gallery() {
  const { searchQuery, selectedCategory } = useSearch();

  // Filtrar productos basado en búsqueda y categoría
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Filtro por categoría
      const matchesCategory = 
        selectedCategory === 'todos' || product.category === selectedCategory;

      // Filtro por búsqueda
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our curated collection of high-quality products
          </p>
        </div>

        {/* Mostrar búsqueda activa */}
        {(searchQuery || selectedCategory !== 'todos') && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-gray-700">
              {searchQuery && `Búsqueda: "${searchQuery}"`}
              {searchQuery && selectedCategory !== 'todos' && ' • '}
              {selectedCategory !== 'todos' && 
                `Categoría: ${selectedCategory === 'electronics' ? 'Electrónica' : 'Accesorios'}`
              }
            </p>
          </div>
        )}

        {/* Grid de Productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery || selectedCategory !== 'todos'
                ? 'No encontramos productos que coincidan con tu búsqueda'
                : 'No hay productos disponibles'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
