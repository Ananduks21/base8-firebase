
import Link from 'next/link';
import Logo from './Logo';
// Removed Button, ShoppingBag, Menu, Sheet, SheetContent, SheetTrigger, SheetClose imports as they are no longer used.

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#products', label: 'Products' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="#home" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
          <Logo className="h-8 w-auto" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* The div containing ShoppingBag icon and mobile Menu icon (Sheet) has been removed */}
      </div>
    </header>
  );
}

