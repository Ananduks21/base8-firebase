import ProductList from '@/components/products/ProductList';

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Products</h1>
      <p className="text-lg text-muted-foreground">
        Browse our curated selection of high-quality furniture and mattresses.
      </p>
      <ProductList />
    </div>
  );
}
