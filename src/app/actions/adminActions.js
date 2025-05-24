
'use server';

import { addProductToSampleData } from '@/lib/placeholder-data';

export async function addProduct(formData) {
  // Map formData from AddProductPage to the structure expected by addProductToSampleData
  const newProductData = {
    name: formData.ProductName,
    description: formData.Description,
    price: parseFloat(formData.ProductPrice), // Ensure price is a number
    category: formData.category,
    imageUrl: formData.ProductImage,
    materials: formData.materials,
    dimensions: formData.dimensions,
    careInstructions: formData.careInstructions,
    aiHint: formData.aiHint,
    // features can be added if there's a form field for it, otherwise defaults to []
  };

  try {
    // Add the product to the in-memory array in placeholder-data.js
    const addedProduct = addProductToSampleData(newProductData);
    
    console.log('Product added to placeholder data:', addedProduct);

    // Return a success response.
    // The 'data' field now contains the product as it was added to the array.
    return {
      success: true,
      message: 'Product added to placeholder list successfully. Changes are temporary and will be lost on server restart.',
      data: addedProduct, 
    };
  } catch (error) {
    console.error('Error in addProduct server action:', error);
    return { 
      success: false, 
      message: error.message || 'An unexpected error occurred while adding the product.' 
    };
  }
}
