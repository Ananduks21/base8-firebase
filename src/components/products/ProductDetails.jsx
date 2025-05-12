
import Image from 'next/image';
import { Card } from '@/components/ui/card'; // CardContent and CardHeader not used if image is directly in Card
import { Badge } from '@/components/ui/badge';

export default function ProductDetailsDisplay({ product }) {
  return (
    <div className="flex flex-col gap-6 md:gap-8 items-center p-2 sm:p-0">
      <Card className="overflow-hidden rounded-lg shadow-lg w-full max-w-xl md:max-w-2xl">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={450} // Adjusted for 16:9 aspect ratio with width 800
          className="object-cover w-full aspect-video" // 16:9 aspect ratio
          data-ai-hint={product.aiHint || "furniture details"}
          priority // Prioritize loading main product image
        />
      </Card>
      
      <div className="space-y-4 md:space-y-6 w-full max-w-xl md:max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{product.name}</h1>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Badge variant="secondary" className="text-sm">{product.category}</Badge>
          <span className="text-xl md:text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{product.description}</p>

        <div className="space-y-3 md:space-y-4">
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-1">Materials</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{product.materials}</p>
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-1">Dimensions</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{product.dimensions}</p>
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-1">Care Instructions</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{product.careInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

