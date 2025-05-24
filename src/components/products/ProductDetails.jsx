
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProductDetailsDisplay({ product }) {
  // Directly access fields from the product object (placeholder data structure)
  const name = product.name;
  const description = product.description;
  const price = product.price;
  const imageUrl = product.imageUrl;
  const category = product.category;
  const materials = product.materials;
  const dimensions = product.dimensions;
  const careInstructions = product.careInstructions;
  const aiHint = product.aiHint;

  return (
    <div className="flex flex-col gap-6 md:gap-8 items-center p-2 sm:p-0">
      <Card className="overflow-hidden rounded-lg shadow-lg w-full max-w-xl md:max-w-2xl">
        <Image
          src={imageUrl}
          alt={name}
          width={800}
          height={450}
          className="object-cover w-full aspect-video"
          data-ai-hint={aiHint || "furniture details"}
          priority
        />
      </Card>
      
      <div className="space-y-4 md:space-y-6 w-full max-w-xl md:max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{name}</h1>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {category && <Badge variant="secondary" className="text-sm">{category}</Badge>}
          <span className="text-xl md:text-2xl font-bold text-primary">
            ${price ? price.toFixed(2) : '0.00'}
          </span>
        </div>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{description}</p>

        <div className="space-y-3 md:space-y-4">
          {materials && (
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1">Materials</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{materials}</p>
            </div>
          )}
          {dimensions && (
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1">Dimensions</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{dimensions}</p>
            </div>
          )}
          {careInstructions && (
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1">Care Instructions</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{careInstructions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
