import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { sampleProducts } from '@/lib/placeholder-data';
import Image from 'next/image';

export default function HomePage() {
  const featuredProducts = sampleProducts.slice(0, 4); // Display first 4 products as featured

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary via-background to-secondary/70 rounded-lg p-8 md:p-16 text-center overflow-hidden shadow-lg">
        <div className="absolute inset-0 opacity-10">
           {/* Decorative background image */}
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Welcome to <span className="text-primary">Base8</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-8">
            Your one-stop shop for high-quality furniture and mattresses designed to make your home feel cozy, stylish, and comfortable.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Explore Our Catalog</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Company Mission/Value Prop */}
      <section className="bg-card p-8 md:p-12 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
             <Image 
              src="https://picsum.photos/seed/homeinterior/800/600" 
              alt="Comfortable living room" 
              width={800} 
              height={600} 
              className="rounded-lg object-cover shadow-lg"
              data-ai-hint="living room interior"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Furnish Your Space with Elegance</h2>
            <p className="text-muted-foreground text-lg">
              At Base8, we believe that your home should be a sanctuary. That's why we offer a wide selection of furniture and mattresses that combine quality craftsmanship with timeless design. 
            </p>
            <p className="text-muted-foreground text-lg">
              Discover pieces that reflect your personal style and create a comfortable, inviting atmosphere for you and your loved ones.
            </p>
            <Button asChild variant="outline">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
