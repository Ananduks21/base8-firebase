import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our products, need assistance, or just want to say hello.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
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
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" placeholder="Question about sofas" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." rows={5} required />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
