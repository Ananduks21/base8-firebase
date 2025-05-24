
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onViewDetails }) {
  // Directly access fields from the product object (placeholder data structure)
  const name = product.name;
  const description = product.description;
  const price = product.price;
  const imageUrl = product.imageUrl; // Assuming placeholder data has imageUrl
  const aiHint = product.aiHint;

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0">
        <div className="aspect-w-16 aspect-h-9 relative">
          <Image
            src={imageUrl}
            alt={name}
            width={600}
            height={400}
            className="object-cover w-full h-48 sm:h-56"
            data-ai-hint={aiHint || "furniture item"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 truncate" title={name}>
          {name}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2" title={description}>
          {description}
        </p>
        <p className="text-xl font-bold text-primary">
          ${price ? price.toFixed(2) : '0.00'}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onViewDetails(product)} className="w-full" variant="outline">
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
