
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata = {
  title: 'Base8 - Your Home Furnishing Destination',
  description: 'Your one-stop shop for high-quality furniture and mattresses. Explore our catalog, learn about us, and get in touch!', // Updated description
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* Adjusted padding: container and px-4 applied here, py-8 removed */}
          <main className="flex-grow container mx-auto px-4"> 
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
