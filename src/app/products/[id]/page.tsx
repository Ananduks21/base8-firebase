import { getProductById, sampleProducts } from '@/lib/placeholder-data';
import ProductDetailsDisplay from '@/components/products/ProductDetails';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  return {
    title: `${product.name} | Base8 Catalog`,
    description: product.description,
  };
}

// Statically generate routes for all products
export async function generateStaticParams() {
  return sampleProducts.map((product) => ({
    id: product.id,
  }));
}


export default function ProductDetailPage({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
       <Button variant="outline" asChild className="mb-6">
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>
      </Button>
      <ProductDetailsDisplay product={product} />
    </div>
  );
}
