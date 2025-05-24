
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Menu as MenuIcon, X, KeyRound } from 'lucide-react'; // Added KeyRound

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/#about', label: 'About Us' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdminLoggedIn(localStorage.getItem('isAdminAuthenticated') === 'true');
    };
    
    checkAdminStatus(); // Check on mount
    window.addEventListener('storage', checkAdminStatus); // Listen for storage changes (e.g. login/logout on another tab)
    
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's md breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  const handleLinkClick = (e, href) => {
    setIsMobileMenuOpen(false); 

    if (href.startsWith('/#')) { 
      const targetId = href.substring(2); 
      if (window.location.pathname === '/') {
        e.preventDefault(); 
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
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
        <div className="hidden md:block flex-shrink-0">
          <Link href="/#home" onClick={(e) => handleLinkClick(e, '/#home')} className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
        
        <div className="md:hidden flex-grow flex justify-center">
          <Link href="/#home" onClick={(e) => handleLinkClick(e, '/#home')} className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
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

        <div className="flex-shrink-0 flex items-center">
          {/* Admin Login/Panel Link */}
          <Link
            href={isAdminLoggedIn ? "/admin/add-product" : "/admin/login"}
            className="p-2 text-foreground/70 hover:text-foreground transition-colors"
            title={isAdminLoggedIn ? "Admin Panel" : "Admin Login"}
          >
            <KeyRound className="h-5 w-5" />
          </Link>
          {/* Mobile Spacer - adjust if KeyRound icon changes overall balance */}
          <div className="md:hidden w-6 sm:w-8"> {/* Adjusted spacer for icon */}
            {/* This space ensures the mobile logo is truly centered relative to the hamburger icon & admin icon */}
          </div>
          {/* Desktop Spacer - adjust if KeyRound icon changes overall balance */}
          <div className="hidden md:block w-[60px] sm:w-[70px]"> {/* Adjusted spacer for icon */}
            {/* This space ensures the desktop navigation is truly centered relative to the logo & admin icon */}
          </div>
        </div>
      </div>

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
            {/* Admin link in mobile menu */}
            <Link
              href={isAdminLoggedIn ? "/admin/add-product" : "/admin/login"}
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {isAdminLoggedIn ? "Admin Panel" : "Admin Login"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
