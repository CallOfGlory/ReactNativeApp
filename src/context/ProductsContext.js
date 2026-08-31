import { createContext, useContext, useState } from 'react';

const ProductsContext = createContext(null);

let nextId = 100;

const SEED_PRODUCTS = [
  { id: 1, name: 'Ноутбук ProBook', price: 32999, description: 'Робоча станція 14".', deletedAt: null },
  { id: 2, name: 'Бездротова миша', price: 599, description: 'Ергономічна, Bluetooth.', deletedAt: null },
  { id: 3, name: 'Механічна клавіатура', price: 2199, description: 'Hot-swap, RGB.', deletedAt: null },
  { id: 4, name: 'Монітор 27"', price: 8499, description: 'IPS, 144Hz.', deletedAt: null },
];

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(SEED_PRODUCTS);

  const addProduct = ({ name, price, description }) => {
    setProducts((prev) => [
      { id: nextId++, name, price, description, deletedAt: null },
      ...prev,
    ]);
  };

  const updateProduct = (id, { name, price, description }) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, name, price, description } : product
      )
    );
  };

  const softDeleteProduct = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, deletedAt: Date.now() } : product
      )
    );
  };

  const restoreProduct = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, deletedAt: null } : product
      )
    );
  };

  const hardDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        softDeleteProduct,
        restoreProduct,
        hardDeleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return ctx;
}
