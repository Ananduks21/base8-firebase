
import qs from 'qs';
import axios from 'axios';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN; // For admin actions

// Function to fetch data from Strapi
export async function fetchFromStrapi(endpoint, queryParams = {}, options = {}) {
  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });
  const requestUrl = `${STRAPI_API_URL}/api${endpoint}${queryString ? `?${queryString}` : ''}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  if (options.useAdminToken && STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }


  try {
    const response = await axios.get(requestUrl, { headers });
    return response.data;
  } catch (error) {
    console.error(`Strapi API GET error at ${endpoint}:`, error.response ? error.response.data : error.message);
    // Rethrow or return a structured error
    return error.response ? error.response.data : { error: { message: error.message } };
  }
}


export async function createProductInStrapi(productData) {
  const requestUrl = `${STRAPI_API_URL}/api/products`;

  if (!STRAPI_API_TOKEN) {
    console.error('STRAPI_API_TOKEN is not defined. Cannot create product.');
    return { success: false, message: 'Server configuration error: API token missing.' };
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
  };

  try {
    // Strapi expects the data to be nested under a 'data' key
    const response = await axios.post(requestUrl, { data: productData }, { headers });
    return response.data; 
  } catch (error) {
    console.error('Strapi API POST error at /api/products:', error.response ? error.response.data : error.message);
    // Return the error response from Strapi if available, or a generic error
     if (error.response && error.response.data) {
        // Strapi often returns detailed errors in error.response.data.error
        const strapiError = error.response.data.error;
        if (strapiError && strapiError.message) {
            let detailedMessage = strapiError.message;
            if (strapiError.details && strapiError.details.errors) {
                detailedMessage += ": " + strapiError.details.errors.map(e => `${e.path.join('.')} - ${e.message}`).join(', ');
            }
             return { error: { message: detailedMessage, details: strapiError.details } };
        }
        return error.response.data;
    }
    return { error: { message: error.message || 'Unknown error during product creation.' } };
  }
}


// Function to get a single product by ID
export async function getProductById(id) {
  // Assuming your product content type is 'products'
  // And you want to populate all relations (e.g., images, categories)
  const queryParams = { populate: '*' };
  return await fetchFromStrapi(`/products/${id}`, queryParams);
}

// Function to get all products
export async function getAllProducts() {
  // Assuming your product content type is 'products'
  // And you want to populate all relations
  const queryParams = { populate: '*' };
  return await fetchFromStrapi('/products', queryParams);
}


// Function to get products by category
export async function getProductsByCategory(category) {
    return await fetchFromStrapi('/products', {
        filters: {
            category: { // Assuming 'category' is the field name in Strapi
                name: { // If category is a relation and has a 'name' field
                    $eq: category,
                }
            },
        },
        populate: '*',
    });
}


// Function to get all available categories
export async function getAllCategories() {
    // Assuming your category content type is 'categories'
    return await fetchFromStrapi('/categories');
}
