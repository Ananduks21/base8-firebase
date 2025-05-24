
'use server';

import { createProductInStrapi } from '@/lib/strapi'; // We'll add this to strapi.js

export async function addProduct(productData) {
  // In a real app, you'd validate permissions here, e.g., check an auth token/session
  // For this demo, we assume if they reach this action, they are "authorized" by the client-side check.

  try {
    const newProduct = {
      ProductName: productData.ProductName,
      Description: productData.Description,
      ProductPrice: parseFloat(productData.ProductPrice),
      ProductImage: productData.ProductImage,
      // Add any other default fields Strapi might require, e.g., category, publishedAt
      // category: 'Default', // Example
      // publishedAt: new Date().toISOString(), // Example to publish immediately
    };

    const response = await createProductInStrapi(newProduct);

    if (response && response.data) {
      return { success: true, data: response.data };
    } else {
      // Attempt to parse Strapi error if available
      let errorMessage = 'Failed to add product to Strapi.';
      if (response && response.error && response.error.message) {
        errorMessage = `Strapi error: ${response.error.message}`;
        if (response.error.details && response.error.details.errors) {
            errorMessage += ` Details: ${response.error.details.errors.map(e => e.message).join(', ')}`;
        }
      } else if (typeof response === 'string') {
        errorMessage = response;
      }
      console.error('Error from createProductInStrapi:', response);
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error('Server action addProduct error:', error);
    return { success: false, message: error.message || 'An unexpected error occurred while adding the product.' };
  }
}
