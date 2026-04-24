function ProductImage({ src, alt }) {
  return (
    <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default ProductImage;