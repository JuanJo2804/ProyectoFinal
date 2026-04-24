function ProductPrice({ price }) {
  return (
    <div className="text-lg font-semibold text-gray-800">
      ${price.toFixed(2)}
    </div>
  );
} 
export default ProductPrice;