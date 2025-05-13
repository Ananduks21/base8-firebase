
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; 

export default function ProductDetailsDisplay({ product }) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

  // Guard clause to prevent errors if product or attributes are missing
  if (!product || !product.attributes) {
    console.warn("ProductDetailsDisplay received invalid product data:", product);
    return <div className="p-4 text-center text-muted-foreground">Product details are currently unavailable.</div>;
  }

  const name = product.attributes.ProductName;
  const description = product.attributes.Description;
  const price = product.attributes.ProductPrice;
  const imageUrl = product.attributes.ProductImage?.data?.attributes?.url
    ? `${strapiUrl}${product.attributes.ProductImage.data.attributes.url}`
    : 'https://picsum.photos/seed/placeholder_detail/800/450'; 
  const aiHint = product.attributes.aiHint || "product detail image";
  const categoryName = product.attributes.Category?.data?.attributes?.Name || 'Uncategorized'; // Example: if category is a relation


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
          unoptimized={imageUrl.startsWith('http://localhost')} 
        />
      </Card>
      
      <div className="space-y-4 md:space-y-6 w-full max-w-xl md:max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{name || 'Unnamed Product'}</h1>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {/* Display category if available */}
          {categoryName && <Badge variant="secondary" className="text-sm">{categoryName}</Badge>}
          <span className="text-xl md:text-2xl font-bold text-primary">
            {typeof price === 'number' ? `$${price.toFixed(2)}` : 'N/A'}
          </span>
        </div>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {description || 'No detailed description available.'}
        </p>

        {/* Optional: Add back other fields if they exist in your Strapi model and are populated */}
        {/* 
        <div className="space-y-3 md:space-y-4">
          {product.attributes.Materials && (
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1">Materials</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{product.attributes.Materials}</p>
            </div>
          )}
          {product.attributes.Dimensions && (
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1">Dimensions</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{product.attributes.Dimensions}</p>
            </div>
          )}
          {product.attributes.CareInstructions && (
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-1">Care Instructions</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{product.attributes.CareInstructions}</p>
            </div>
          )}
        </div>
        */}
      </div>
    </div>
  );
}

