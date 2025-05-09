
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { sampleProducts } from '@/lib/placeholder-data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, Target, Eye, Phone, Mail, MapPin } from 'lucide-react';

import ProductList from '@/components/products/ProductList';
import ProductDetailModal from '@/components/products/ProductDetailModal';


export default function SinglePageApp() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const featuredProducts = sampleProducts.slice(0, 4);

  // Smooth scroll for hash links
  useEffect(() => {
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        const element = document.querySelector(target.hash);
        if (element) {
          event.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleHashLinkClick);
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, []);


  return (
    <div className="space-y-16">
      {/* Home Section */}
      <section id="home" className="space-y-12 pt-8">
        <div className="relative bg-gradient-to-r from-secondary via-background to-secondary/70 rounded-lg p-8 md:p-16 text-center overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              Welcome to <span className="text-primary">Base8</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-8">
              Your one-stop shop for high-quality furniture and mattresses designed to make your home feel cozy, stylish, and comfortable.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#products">Explore Our Catalog</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
             <Card key={product.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader className="p-0">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-48 sm:h-56"
                    data-ai-hint={product.aiHint || "furniture item"}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-semibold mb-1 truncate" title={product.name}>
                  {product.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2" title={product.description}>
                  {product.description}
                </p>
                <p className="text-xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <div className="p-4 pt-0">
                <Button onClick={() => handleProductSelect(product)} className="w-full" variant="outline">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="bg-card p-8 md:p-12 rounded-lg shadow-md">
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
                <Link href="#about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="space-y-8 pt-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Products</h1>
        <p className="text-lg text-muted-foreground">
          Browse our curated selection of high-quality furniture and mattresses.
        </p>
        <ProductList onProductSelect={handleProductSelect} />
      </section>

      {/* About Section */}
      <section id="about" className="space-y-12 pt-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">About Base8</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in creating beautiful, comfortable, and stylish living spaces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image 
              src="https://picsum.photos/seed/storefront/800/600" 
              alt="Base8 Storefront or workshop" 
              width={800} 
              height={600} 
              className="rounded-lg object-cover shadow-xl"
              data-ai-hint="furniture workshop"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Base8 was founded with a simple mission: to provide high-quality furniture and mattresses that combine exceptional comfort with timeless style. We understand that your home is more than just a place to live – it's a reflection of your personality and a sanctuary for relaxation and connection.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are passionate about helping you create spaces that you love. From cozy sofas to supportive mattresses, every item in our collection is carefully selected for its craftsmanship, durability, and aesthetic appeal. We believe that great design should be accessible to everyone, which is why we offer something for every taste and budget.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-semibold tracking-tight text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-6 h-6 mr-2 text-primary" /> Quality Craftsmanship
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We partner with skilled artisans and reputable manufacturers to ensure every piece meets our high standards of quality and durability.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-2 text-primary" /> Customer Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our priority. We strive to provide excellent service and a seamless shopping experience, from browsing to delivery.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-primary" /> Timeless Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We offer a curated selection of furniture that blends contemporary trends with classic elegance, ensuring pieces you'll love for years to come.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center bg-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Follow us on social media for exclusive offers, new arrivals, and inspiration for furnishing your space.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="space-y-12 pt-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about our products, need assistance, or just want to say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+15198543997" className="text-muted-foreground hover:text-primary transition-colors">
                    +1 519-854-3997
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:base8furnitures@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    base8furnitures@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    123 Furniture Lane, Cozytown, CA 98765
                    <br />
                    (Please note: This is a placeholder address.)
                  </p>
                </div>
              </div>
              <div className="pt-4">
                  <Image 
                      src="https://picsum.photos/seed/maplocation/600/300" 
                      alt="Map placeholder" 
                      width={600} 
                      height={300} 
                      className="rounded-md object-cover w-full"
                      data-ai-hint="map location"
                  />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent (simulated)!"); }}>
                <div>
                  <Label htmlFor="ssp-name">Full Name</Label>
                  <Input id="ssp-name" type="text" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="ssp-email">Email Address</Label>
                  <Input id="ssp-email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div>
                  <Label htmlFor="ssp-subject">Subject</Label>
                  <Input id="ssp-subject" type="text" placeholder="Question about sofas" />
                </div>
                <div>
                  <Label htmlFor="ssp-message">Message</Label>
                  <Textarea id="ssp-message" placeholder="Your message here..." rows={5} required />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
