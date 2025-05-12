'use client';

import { useState } from 'react';
import ProductDetailsDisplay from '@/components/products/ProductDetails';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import EnquiryFormModal from './EnquiryFormModal';

export default function ProductDetailModal({ product, isOpen, onClose }) {
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);

  if (!isOpen || !product) return null;

  const handleEnquiryOpen = () => {
    setIsEnquiryFormOpen(true);
  };

  const handleEnquiryClose = () => {
    setIsEnquiryFormOpen(false);
    // Optionally, keep the main product detail modal open
    // onClose(); 
  };

  return (
    <> {/* Fragment to hold both Dialogs */}
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
          onClose(); // Call original onClose when main dialog closes
          setIsEnquiryFormOpen(false); // Ensure enquiry form also closes if main closes
        }
      }}>
        <DialogContent className="rounded-lg sm:max-w-3xl w-[calc(100%-1rem)] sm:w-full max-h-[90vh] overflow-y-auto p-4 md:p-6">
          <DialogHeader className="sr-only">
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>{product.description}</DialogDescription>
          </DialogHeader>
          <ProductDetailsDisplay product={product} />
          <div className="mt-6 flex justify-end">
            <Button onClick={handleEnquiryOpen} variant="outline">Contact for Enquiry</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enquiry Form Modal */}
      {isEnquiryFormOpen && product && (
        <EnquiryFormModal
          product={product}
          isOpen={isEnquiryFormOpen}
          onClose={handleEnquiryClose}
        />
      )}
    </>
  );
}
