// Nombre de la clave en localStorage
const CART_KEY = 'carrito_productos';

/**
 * Obtener todos los productos del carrito
 */
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    return [];
  }
};

/**
 * Guardar carrito completo en localStorage
 */
export const saveCart = (cartItems) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    // Disparar evento personalizado para actualizar otros componentes
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error al guardar carrito:', error);
  }
};

/**
 * Agregar producto al carrito
 * Si ya existe, incrementa la cantidad
 */
export const addToCart = (product) => {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // Si ya existe, incrementar cantidad
    existingProduct.quantity += 1;
  } else {
    // Si no existe, agregarlo con cantidad 1
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart(cart);
  return cart;
};

/**
 * Eliminar producto del carrito completamente
 */
export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

/**
 * Actualizar cantidad de un producto
 */
export const updateQuantity = (productId, quantity) => {
  const cart = getCart();
  const product = cart.find((item) => item.id === productId);

  if (product) {
    if (quantity <= 0) {
      // Si cantidad es 0 o menos, eliminar el producto
      return removeFromCart(productId);
    }
    product.quantity = quantity;
  }

  saveCart(cart);
  return cart;
};

/**
 * Obtener cantidad total de items en el carrito
 */
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Obtener total del precio del carrito
 */
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Vaciar carrito completamente
 */
export const clearCart = () => {
  saveCart([]);
};
