
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { addProduct } from '@/app/actions/adminActions'; // We'll create this server action

const productSchema = z.object({
  ProductName: z.string().min(3, 'Product name must be at least 3 characters'),
  Description: z.string().min(10, 'Description must be at least 10 characters'),
  ProductPrice: z.coerce.number().min(0.01, 'Price must be a positive number'),
  ProductImage: z.string().url('Must be a valid URL for the product image'),
});

export default function AddProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    // Protect this page
    if (localStorage.getItem('isAdminAuthenticated') !== 'true') {
      router.replace('/admin/login');
      toast({ title: 'Unauthorized', description: 'Please log in to access this page.', variant: 'destructive'});
    }
  }, [router, toast]);

  const onSubmit = async (data) => {
    try {
      const result = await addProduct(data);
      if (result.success) {
        toast({
          title: 'Product Added!',
          description: `${data.ProductName} has been successfully added.`,
        });
        reset(); // Clear the form
      } else {
        throw new Error(result.message || 'Failed to add product.');
      }
    } catch (error) {
      toast({
        title: 'Error Adding Product',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    router.replace('/admin/login');
  };


  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
            <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
          </div>
          <CardDescription>Fill in the details below to add a new product to the catalog.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="ProductName">Product Name</Label>
              <Input id="ProductName" {...register('ProductName')} className="mt-1" />
              {errors.ProductName && <p className="text-sm text-destructive mt-1">{errors.ProductName.message}</p>}
            </div>

            <div>
              <Label htmlFor="Description">Description</Label>
              <Textarea id="Description" {...register('Description')} rows={4} className="mt-1" />
              {errors.Description && <p className="text-sm text-destructive mt-1">{errors.Description.message}</p>}
            </div>

            <div>
              <Label htmlFor="ProductPrice">Price ($)</Label>
              <Input id="ProductPrice" type="number" step="0.01" {...register('ProductPrice')} className="mt-1" />
              {errors.ProductPrice && <p className="text-sm text-destructive mt-1">{errors.ProductPrice.message}</p>}
            </div>

            <div>
              <Label htmlFor="ProductImage">Image URL</Label>
              <Input id="ProductImage" type="url" {...register('ProductImage')} placeholder="https://example.com/image.jpg" className="mt-1" />
              {errors.ProductImage && <p className="text-sm text-destructive mt-1">{errors.ProductImage.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
