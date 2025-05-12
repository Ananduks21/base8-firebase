'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Menu as MenuIcon, X } from 'lucide-react';

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/products', label: 'Products' }, // Changed href to /products
  { href: '/#about', label: 'About Us' },
  { href: '/#contact', label: 'Contact' },
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

  // Function to handle link clicks for smooth scrolling or navigation
  const handleLinkClick = (e, href) => {
    setIsMobileMenuOpen(false); // Close mobile menu on click

    if (href.startsWith('/#')) { // Check if it's a hash link for the home page
      const targetId = href.substring(2); // Get the ID part (e.g., 'about')
      // Check if we are already on the home page
      if (window.location.pathname === '/') {
        e.preventDefault(); // Prevent default navigation
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // If not on the home page, NextLink will navigate, and the hash will be handled by the browser.
    }
    // For non-hash links (like '/products'), NextLink handles navigation normally.
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Element 1: Hamburger (Mobile Only) / Logo (Desktop Only) */}
        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex-shrink-0">
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
        {/* Desktop Logo */}
        <div className="hidden md:block flex-shrink-0">
          <Link href="/#home" onClick={(e) => handleLinkClick(e, '/#home')} className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
        
        {/* Element 2: Logo (Mobile Only, Centered) / Nav (Desktop Only, Centered) */}
        {/* Mobile Logo */}
        <div className="md:hidden flex-grow flex justify-center">
          <Link href="/#home" onClick={(e) => handleLinkClick(e, '/#home')} className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-grow items-center justify-center space-x-8 text-sm font-medium px-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="transition-colors hover:text-foreground/80 text-foreground/70"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Element 3: Spacer (Mobile, to balance Hamburger) / Spacer (Desktop, to balance Logo for Nav centering) */}
        <div className="flex-shrink-0">
          {/* Mobile Spacer - matches width of hamburger button (p-2 + icon w-6 = 2.5rem = w-10) */}
          <div className="md:hidden w-10">
            {/* This space ensures the mobile logo is truly centered relative to the hamburger icon */}
          </div>
          {/* Desktop Spacer - matches width of desktop logo (~89px) */}
          <div className="hidden md:block w-[89px]">
            {/* This space ensures the desktop navigation is truly centered relative to the logo */}
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
                onClick={(e) => handleLinkClick(e, item.href)}
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
