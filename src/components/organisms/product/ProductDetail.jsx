import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { mockProducts } from "../../../mockdata/mock_products";
import { addToCart } from "../../../utils/cartUtils";

// Importar imágenes directamente
import headphones from '../../../assets/headphones.webp';
import smartwatch from '../../../assets/smartwa.jpg';
import speaker from '../../../assets/speaker.jpg';
import usbCable from '../../../assets/usb-c.jpg';
import phoneCase from '../../../assets/phone-case.jpeg';
import screenProtector from '../../../assets/screen-protector.webp';

const imageMap = {
  'headphones.webp': headphones,
  'smartwa.jpg': smartwatch,
  'speaker.jpg': speaker,
  'usb-c.jpg': usbCable,
  'phone-case.jpeg': phoneCase,
  'screen-protector.webp': screenProtector,
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const product = mockProducts.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Producto no encontrado
          </h1>
          <button
            onClick={() => navigate("/gallery")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver a inicio
          </button>
        </div>
      </div>
    );
  }

  const productImage = imageMap[product.image] || null;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Botón volver */}
        <button
          onClick={() => navigate("/gallery")}
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
        >
          ← Volver a productos
        </button>

        {/* Contenedor principal */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Imagen del producto */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Información del producto */}
            <div className="flex flex-col justify-between">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl ${
                          i < Math.round(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">
                    {product.rating} ({product.rating * 20} opiniones)
                  </span>
                </div>

                {/* Descripción */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Características */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Características principales:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Producto de alta calidad</li>
                    <li>✓ Garantía de 1 año</li>
                    <li>✓ Envío gratuito</li>
                    <li>✓ Devolución sin costo</li>
                  </ul>
                </div>
              </div>

              {/* Precio y botón de compra */}
              <div>
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Precio:</p>
                  <p className="text-5xl font-bold text-blue-600">
                    ${product.price}
                  </p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                    added
                      ? "bg-green-500 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {added
                    ? "✅ ¡Agregado al carrito!"
                    : "🛒 Agregar al carrito"}
                </button>

                {/* Información de envío */}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    ✓ Envío rápido disponible
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Entrega estimada: 2-5 días hábiles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
