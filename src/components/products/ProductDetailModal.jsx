
'use client';

import ProductDetailsDisplay from '@/components/products/ProductDetails';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

export default function ProductDetailModal({ product, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <DialogDescription className="sr-only">{product.description}</DialogDescription>
        </DialogHeader>
        <ProductDetailsDisplay product={product} />
        <DialogClose asChild className="absolute right-4 top-4">
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close product details">
                 <X className="h-4 w-4" />
            </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
