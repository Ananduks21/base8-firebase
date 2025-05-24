// src/app/products/page.jsx (New Server Component)
import { sampleProducts, productCategories } from '@/lib/placeholder-data';
import ProductClientPage from './client-page'; // Import the new client component

export const metadata = {
  title: 'Our Products - Base8',
  description: 'Explore our exquisite collection of furniture and mattresses.',
};

export default async function ProductsPage() {
  // This function (and thus the read of sampleProducts and productCategories)
  // will re-run on router.refresh() because it's a Server Component.
  
  // We use JSON.parse(JSON.stringify(...)) to pass a deep copy of the arrays as props.
  // This is a good practice for mutable data to prevent unexpected side effects
  // and ensure React detects prop changes if the reference needs to be new.
  const currentProducts = JSON.parse(JSON.stringify(sampleProducts));
  const currentCategories = JSON.parse(JSON.stringify(productCategories));

  return <ProductClientPage initialProducts={currentProducts} initialCategories={currentCategories} />;
}
