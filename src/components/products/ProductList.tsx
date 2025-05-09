
'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import type { Product, FilterState } from '@/lib/types';
import { sampleProducts } from '@/lib/placeholder-data'; // Assuming this is the full list
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter as FilterIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ProductList() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    priceRange: [0, 2000], // Default max price, adjust as needed
    searchTerm: '',
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      const categoryMatch = filters.category === 'All' || product.category === filters.category;
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const searchTermMatch = filters.searchTerm === '' ||
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      return categoryMatch && priceMatch && searchTermMatch;
    });
  }, [filters]);

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" /> Filter
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
            <SheetHeader className="p-6 pb-4 border-b">
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-grow">
              <ProductFilter onFilterChange={handleFilterChange} initialFilters={filters} />
            </ScrollArea>
            {/* Optional: SheetFooter for Apply/Clear buttons if needed later 
            <SheetFooter className="p-6 pt-4 border-t">
              <Button type="button" className="w-full">Apply Filters</Button>
            </SheetFooter>
            */}
          </SheetContent>
        </Sheet>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No products match your filters.</p>
        </div>
      )}
    </div>
  );
}
