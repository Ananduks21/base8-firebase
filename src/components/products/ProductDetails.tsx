import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetailsDisplay({ product }: ProductDetailsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      <Card className="overflow-hidden rounded-lg shadow-lg">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={600}
          className="object-cover w-full aspect-[4/3]"
          data-ai-hint={product.aiHint || "furniture details"}
          priority // Prioritize loading main product image
        />
      </Card>
      
      <div className="space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
        
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{product.category}</Badge>
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>

        <p className="text-muted-foreground text-base leading-relaxed">{product.description}</p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Materials</h3>
            <p className="text-sm text-muted-foreground">{product.materials}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Dimensions</h3>
            <p className="text-sm text-muted-foreground">{product.dimensions}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Care Instructions</h3>
            <p className="text-sm text-muted-foreground">{product.careInstructions}</p>
          </div>
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
