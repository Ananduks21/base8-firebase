import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">About Base8</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your trusted partner in creating beautiful, comfortable, and stylish living spaces.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
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
      </section>

      <section className="space-y-8">
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
      </section>

      <section className="text-center bg-secondary p-8 rounded-lg">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Join Our Community</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Follow us on social media for exclusive offers, new arrivals, and inspiration for furnishing your space.
        </p>
        {/* Social media links could be added here */}
      </section>
    </div>
  );
}
