export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  materials: string;
  dimensions: string;
  careInstructions: string;
  features?: string[];
  aiHint?: string; // For data-ai-hint attribute
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  searchTerm: string;
}
