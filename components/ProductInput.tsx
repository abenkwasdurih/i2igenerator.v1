import React from 'react';

interface ProductInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const ProductInput: React.FC<ProductInputProps> = ({ value, onChange, disabled }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="misalnya, Sepatu Lari Tahan Air"
      className="w-full bg-gray-800 border-2 border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Nama Produk"
      disabled={disabled}
    />
  );
};

export default ProductInput;