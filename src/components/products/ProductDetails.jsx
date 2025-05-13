
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Badge might be removed if category is not used

export default function ProductDetailsDisplay({ product }) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

  const name = product.attributes.ProductName;
  const description = product.attributes.Description;
  const price = product.attributes.ProductPrice;
  const imageUrl = product.attributes.ProductImage?.data?.attributes?.url
    ? `${strapiUrl}${product.attributes.ProductImage.data.attributes.url}`
    : 'https://picsum.photos/seed/placeholder_detail/800/450'; // Fallback image for details
  const aiHint = product.attributes.aiHint || "product detail image";


  // Fields like category, materials, dimensions, careInstructions are removed
  // as they are not in the specified API structure (ProductName, Description, ProductPrice, ProductImage)
  // If category is available from another source or nested differently, it can be added back.
  // For now, we'll remove the Badge for category.

  return (
    <div className="flex flex-col gap-6 md:gap-8 items-center p-2 sm:p-0">
      <Card className="overflow-hidden rounded-lg shadow-lg w-full max-w-xl md:max-w-2xl">
        <Image
          src={imageUrl}
          alt={name || 'Product Image'}
          width={800}
          height={450}
          className="object-cover w-full aspect-video"
          data-ai-hint={aiHint}
          priority
          unoptimized={imageUrl.startsWith('http://localhost')} // Useful for local Strapi dev
        />
      </Card>
      
      <div className="space-y-4 md:space-y-6 w-full max-w-xl md:max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{name || 'Unnamed Product'}</h1>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {/* Category Badge removed, can be added back if 'category' field is available */}
          {/* <Badge variant="secondary" className="text-sm">{product.attributes.CategoryName || 'Uncategorized'}</Badge> */}
          <span className="text-xl md:text-2xl font-bold text-primary">
            ${typeof price === 'number' ? price.toFixed(2) : 'N/A'}
          </span>
        </div>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {description || 'No detailed description available.'}
        </p>

        {/* Removed materials, dimensions, careInstructions sections as these fields are not specified in the new API structure */}
        {/* 
        <div className="space-y-3 md:space-y-4">
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-1">Materials</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{product.attributes.Materials || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-1">Dimensions</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{product.attributes.Dimensions || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-1">Care Instructions</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{product.attributes.CareInstructions || 'N/A'}</p>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
