'use client';

import ProductDetailsDisplay from '@/components/products/ProductDetails';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// Button and X icon import removed as custom close button is removed.

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
        {/* 
          The explicit DialogClose button has been removed.
          The DialogContent component from shadcn/ui includes a default close button (X icon)
          which will be controlled by the `open` and `onOpenChange` props of the Dialog.
        */}
      </DialogContent>
    </Dialog>
  );
}
