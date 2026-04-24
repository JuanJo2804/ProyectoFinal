function ProductTitle({ name }) {
  return (
    <h3 className="text-lg font-semibold text-gray-800 truncate hover:text-blue-600 transition-colors">
      {name}
    </h3>
  );
}

export default ProductTitle;
