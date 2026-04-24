import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImage from "../atoms/product/ProductImage";
import ProductPrice from "../atoms/product/ProductPrice";
import ProductRate from "../atoms/product/ProductRate";
import ProductTitle from "../atoms/product/ProductTitle";
import { addToCart } from '../../utils/cartUtils';

// Importar imágenes directamente
import headphones from '../../assets/headphones.webp';
import smartwatch from '../../assets/smartwa.jpg';
import speaker from '../../assets/speaker.jpg';
import usbCable from '../../assets/usb-c.jpg';
import phoneCase from '../../assets/phone-case.jpeg';
import screenProtector from '../../assets/screen-protector.webp';

const imageMap = {
  'headphones.webp': headphones,
  'smartwa.jpg': smartwatch,
  'speaker.jpg': speaker,
  'usb-c.jpg': usbCable,
  'phone-case.jpeg': phoneCase,
  'screen-protector.webp': screenProtector,
};

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const productImage = imageMap[product.image] || null;

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer hover:scale-105"
    >
      <ProductImage src={productImage} alt={product.name} />
      <div className="mt-4 space-y-2 flex-1">
        <ProductTitle name={product.name} />
        <ProductPrice price={product.price} />
        <ProductRate rating={product.rating} />
      </div>
      
      {/* Botón Agregar al Carrito */}
      <button
        onClick={handleAddToCart}
        className={`mt-4 w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
          added
            ? 'bg-green-500 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {added ? '✅ Agregado!' : '🛒 Agregar al carrito'}
      </button>
    </div>
  );
}

export default ProductCard; 