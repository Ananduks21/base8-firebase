// src/app/products/client-page.jsx (New Client Component)
'use client';

import { useState } from 'react';
import ProductList from '@/components/products/ProductList';
import ProductDetailModal from '@/components/products/ProductDetailModal';
// We no longer import sampleProducts directly here; it comes via props.

export default function ProductClientPage({ initialProducts, initialCategories }) {
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
      <ProductList 
        products={initialProducts} 
        categories={initialCategories} // Pass categories to ProductList
        onProductSelect={handleProductSelect} 
      />

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
