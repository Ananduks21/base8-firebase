
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onViewDetails }) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  
  const name = product.attributes.ProductName;
  const description = product.attributes.Description;
  const price = product.attributes.ProductPrice;
  // Strapi image object can be complex, ensure proper path and fallback
  const imageUrl = product.attributes.ProductImage?.data?.attributes?.url
    ? `${strapiUrl}${product.attributes.ProductImage.data.attributes.url}`
    : 'https://picsum.photos/seed/placeholder/600/400'; // Fallback image
  const aiHint = product.attributes.aiHint || "product image"; // Assuming aiHint might still exist or you want a default

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0">
        <div className="aspect-w-16 aspect-h-9 relative">
          <Image
            src={imageUrl}
            alt={name || 'Product Image'}
            width={600}
            height={400}
            className="object-cover w-full h-48 sm:h-56"
            data-ai-hint={aiHint}
            unoptimized={imageUrl.startsWith('http://localhost')} // Useful for local Strapi dev
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 truncate" title={name}>
          {name || 'Unnamed Product'}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2" title={description}>
          {description || 'No description available.'}
        </p>
        <p className="text-xl font-bold text-primary">
          ${typeof price === 'number' ? price.toFixed(2) : 'N/A'}
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
