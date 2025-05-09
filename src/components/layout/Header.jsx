import Link from 'next/link';
import Logo from './Logo';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#products', label: 'Products' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="flex-none">
          <Link href="#home" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
        
        {/* Navigation centered */}
        <nav className="hidden md:flex flex-grow items-center justify-center space-x-8 text-sm font-medium"> {/* Increased space-x to 8 */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/70" /* Slightly dimmer for non-active, can be adjusted */
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Optional: Add an empty div with flex-none if specific right-side balancing is ever needed for the logo's width */}
         <div className="flex-none w-auto"> {/* This div helps balance the flex layout if needed, can be empty */}
        </div>
      </div>
    </header>
  );
}
