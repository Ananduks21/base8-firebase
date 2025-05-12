'use client';

import { useState } from 'react';
import ProductList from '@/components/products/ProductList';
import ProductDetailModal from '@/components/products/ProductDetailModal';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-8 py-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center">Our Exquisite Collection</h1>
      <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
        Browse our curated selection of high-quality furniture and mattresses, designed for luxurious living.
      </p>
      <ProductList onProductSelect={handleProductSelect} />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
