
// Strapi API functions are no longer needed as the integration is removed.
// This file can be kept empty, or functions can return mock/empty data
// to prevent errors if they were still imported elsewhere (though they shouldn't be).

// import qs from 'qs';
// import axios from 'axios';

// const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
// const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchFromStrapi(endpoint, queryParams = {}, options = {}) {
  console.warn(`Strapi fetchFromStrapi called for ${endpoint}, but Strapi integration is removed. Returning empty data.`);
  return { data: [], meta: {} }; // Return a structure similar to what Strapi might return
}

export async function createProductInStrapi(productData) {
  console.warn('Strapi createProductInStrapi called, but Strapi integration is removed. Product not saved.');
  // Simulate a Strapi-like error response or a simple failure
  return {
    error: {
      message: 'Strapi integration is removed. Product not saved.',
      details: {},
    },
  };
}

export async function getProductById(id) {
  console.warn(`Strapi getProductById called for ${id}, but Strapi integration is removed. Returning null.`);
  return { data: null };
}

export async function getAllProducts() {
  console.warn('Strapi getAllProducts called, but Strapi integration is removed. Returning empty array.');
  return { data: [], meta: {} };
}

export async function getProductsByCategory(category) {
  console.warn(`Strapi getProductsByCategory called for ${category}, but Strapi integration is removed. Returning empty array.`);
  return { data: [], meta: {} };
}

export async function getAllCategories() {
  console.warn('Strapi getAllCategories called, but Strapi integration is removed. Returning empty array.');
  return { data: [], meta: {} };
}
