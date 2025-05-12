import Link from 'next/link';
import Logo from './Logo';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo className="h-10 w-auto text-primary" />
            </Link>
            <p className="text-sm max-w-xs">
              Your one-stop shop for high-quality furniture and mattresses. Cozy, stylish, and comfortable.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 shrink-0" />
                <a href="tel:+15198543997" className="hover:text-primary transition-colors">+1 519-854-3997</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 shrink-0" />
                <a href="mailto:ananduks21@gmail.com" className="hover:text-primary transition-colors">ananduks21@gmail.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm">
          <p>&copy; {year} Base8. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
