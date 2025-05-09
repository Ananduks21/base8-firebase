import ProductForm from '@/components/admin/ProductForm';

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Manage Products</h1>
      <p className="text-lg text-muted-foreground">
        Add new products to the catalog and leverage AI to generate compelling titles and descriptions.
      </p>
      <ProductForm />
    </div>
  );
}
