
'use client';

import React, { useState, useEffect } from 'react';
import { productCategories } from '@/lib/placeholder-data';
import type { FilterState } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from "@/components/ui/slider";

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters: FilterState;
}

const MAX_PRICE = 2000; // Example max price

export default function ProductFilter({ onFilterChange, initialFilters }: ProductFilterProps) {
  const [category, setCategory] = useState(initialFilters.category);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange);
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [localMinPrice, setLocalMinPrice] = useState(initialFilters.priceRange[0].toString());
  const [localMaxPrice, setLocalMaxPrice] = useState(initialFilters.priceRange[1].toString());
  
  useEffect(() => {
    const handler = setTimeout(() => {
       onFilterChange({ category, priceRange, searchTerm });
    }, 500);
    return () => clearTimeout(handler);
  }, [category, priceRange, searchTerm, onFilterChange]);

  const handleSliderChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    setLocalMinPrice(newRange[0].toString());
    setLocalMaxPrice(newRange[1].toString());
  };
  
  const handleMinPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = e.target.value;
    setLocalMinPrice(newMin);
    const parsedMin = parseInt(newMin, 10);
    if (!isNaN(parsedMin) && parsedMin >= 0 && parsedMin <= priceRange[1]) {
      setPriceRange([parsedMin, priceRange[1]]);
    } else if (newMin === "") {
      setPriceRange([0, priceRange[1]]);
    }
  };

  const handleMaxPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = e.target.value;
    setLocalMaxPrice(newMax);
    const parsedMax = parseInt(newMax, 10);
    if (!isNaN(parsedMax) && parsedMax <= MAX_PRICE && parsedMax >= priceRange[0]) {
      setPriceRange([priceRange[0], parsedMax]);
    } else if (newMax === "") {
      setPriceRange([priceRange[0], MAX_PRICE]);
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-8"> {/* Changed from grid to space-y for single column */}
        <div>
          <Label htmlFor="category-select" className="mb-2 block text-sm font-medium">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category-select">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="mb-2 block text-sm font-medium">Price Range ({`$${priceRange[0]} - $${priceRange[1]}`})</Label>
          <Slider
            min={0}
            max={MAX_PRICE}
            step={10}
            value={priceRange}
            onValueChange={(value) => handleSliderChange(value as [number, number])}
            className="my-4"
          />
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <Label htmlFor="min-price" className="sr-only">Min Price</Label>
              <Input
                id="min-price"
                type="number"
                placeholder="Min"
                value={localMinPrice}
                onChange={handleMinPriceInputChange}
                min="0"
                max={MAX_PRICE}
                className="w-full"
              />
            </div>
            <span className="text-muted-foreground">-</span>
            <div className="flex-1">
              <Label htmlFor="max-price" className="sr-only">Max Price</Label>
              <Input
                id="max-price"
                type="number"
                placeholder="Max"
                value={localMaxPrice}
                onChange={handleMaxPriceInputChange}
                min="0"
                max={MAX_PRICE}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="search-term" className="mb-2 block text-sm font-medium">Search</Label>
          <Input
            id="search-term"
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
