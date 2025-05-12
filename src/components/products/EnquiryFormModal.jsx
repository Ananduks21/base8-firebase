'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EnquiryForm from './EnquiryForm';

export default function EnquiryFormModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-lg sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Enquire about: {product.name}</DialogTitle>
          <DialogDescription>
            Fill out the form below and we&apos;ll get back to you regarding the &quot;{product.name}&quot;.
          </DialogDescription>
        </DialogHeader>
        <EnquiryForm product={product} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}
