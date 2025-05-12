
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react'; // Removed useState

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardDescription
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, Target, Eye, Phone, Mail, MapPin } from 'lucide-react';

// Removed sampleProducts import
// Removed ProductList import
// Removed ProductDetailModal import


export default function SinglePageApp() {
  // Removed state for selectedProduct and isModalOpen
  // Removed handleProductSelect and closeModal functions

  // Smooth scroll for hash links on the home page
  useEffect(() => {
    const handleHashLinkClick = (event) => {
      const target = event.target.closest('a'); // Ensure we get the anchor tag
      // Only handle clicks on links starting with '#' within the current page
      if (target && target.hash && target.pathname === window.location.pathname && target.hash !== '#') {
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
        <div
          className="relative rounded-lg p-8 md:p-12 shadow-lg overflow-hidden bg-cover bg-center bg-no-repeat min-h-[70vh] flex items-center"
          style={{ backgroundImage: "url('https://picsum.photos/seed/luxuryhero/1920/1080')" }}
          data-ai-hint="luxury abstract background"
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div> {/* Overlay for text readability */}
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center w-full">
            <div className="space-y-6 text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                Discover Elegance at <span className="text-primary">Base8</span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-200">
                Exquisite furniture and mattresses, curated for a home that defines luxury and comfort.
              </p>
              {/* Updated button to link to the new products page */}
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/products">Explore Our Catalog</Link> 
              </Button>
            </div>
            <div className="md:order-first">
              <Image
                src="https://picsum.photos/seed/luxuryinterior/800/600"
                alt="Luxurious and stylish home interior"
                width={800}
                height={600}
                className="rounded-lg object-cover shadow-xl aspect-video"
                data-ai-hint="luxury interior"
                priority
              />
            </div>
          </div>
        </div>

        {/* Removed product list section */}

        <div className="bg-card p-8 md:p-12 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Craft Your Dream Sanctuary</h2>
              <p className="text-muted-foreground text-lg">
                At Base8, we are dedicated to transforming spaces into personal sanctuaries. Discover pieces that resonate with your unique style and elevate your everyday living.
              </p>
              <p className="text-muted-foreground text-lg">
                Our collections are a testament to timeless design and unparalleled craftsmanship.
              </p>
            </div>
            <div>
               <Image 
                src="https://picsum.photos/seed/modernliving/800/600" 
                alt="Stylish modern living room with a luxurious feel" 
                width={800} 
                height={600} 
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint="modern livingroom"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-card p-8 md:p-12 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
               <Image 
                src="https://picsum.photos/seed/homeinterior/800/600" 
                alt="Comfortable and elegant living room" 
                width={800} 
                height={600} 
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint="living room interior"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Furnish with Distinction</h2>
              <p className="text-muted-foreground text-lg">
                Base8 offers an exclusive selection of furniture and mattresses, where quality meets artistry. We believe your home should be an embodiment of comfort and sophistication.
              </p>
              <p className="text-muted-foreground text-lg">
                Explore distinctive pieces that promise to create an inviting and luxurious atmosphere for you and your discerning guests.
              </p>
              {/* Updated About Us link to use hash */}
              <Button asChild variant="outline">
                <Link href="#about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Removed from here */}
      {/* <section id="products" className="space-y-8 pt-8"> ... </section> */}

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
          {/* Add social media links if needed */}
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
                  <a href="mailto:ananduks21@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    ananduks21@gmail.com
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
              {/* The CardDescription usage was causing the error */}
              <CardDescription>Use this form for general inquiries.</CardDescription> 
            </CardHeader>
            <CardContent>
              {/* Simplified form for general contact */}
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
                  <Input id="ssp-subject" type="text" placeholder="General Question" />
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

      {/* Modal logic removed from here */}
      {/* {selectedProduct && ( ... )} */}
    </div>
  );
}
