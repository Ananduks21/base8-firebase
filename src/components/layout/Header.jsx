'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Menu as MenuIcon, X } from 'lucide-react';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#products', label: 'Products' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's md breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="flex-none">
          <Link href="#home" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
        
        {/* Desktop Navigation centered */}
        <nav className="hidden md:flex flex-grow items-center justify-center space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/70"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Right side: Mobile Hamburger OR Desktop Spacer (empty) */}
        <div className="flex-none flex items-center ml-auto md:ml-0"> {/* ml-auto for mobile to push button to right if nav is not flex-grow on mobile */}
          <div className="md:hidden"> {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground/70 hover:text-foreground focus:outline-none"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
          <div className="hidden md:block w-auto"> 
            {/* This space is kept for desktop to maintain the flex-none nature of the rightmost element if needed. */}
            {/* For the current layout (Logo | Nav (flex-grow) | This), this being empty and w-auto is fine. */}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <nav id="mobile-menu" className="md:hidden bg-background border-t border-border/40 shadow-lg">
          <div className="container mx-auto flex flex-col space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  // The global smooth scroll handler in page.jsx will manage scrolling.
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
