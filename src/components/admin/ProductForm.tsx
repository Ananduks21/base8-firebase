'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateProductDescription, type GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description';
import { generateProductTitle, type GenerateProductTitleInput } from '@/ai/flows/generate-product-title';
import { Sparkles, Wand2 } from 'lucide-react';

const productFormSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  productCategory: z.string().min(1, 'Category is required'),
  keyFeatures: z.string().min(1, 'Key features are required (comma-separated)'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  materials: z.string().optional(),
  dimensions: z.string().optional(),
  careInstructions: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL').optional(),
  // AI generated fields
  generatedTitle: z.string().optional(),
  generatedDescription: z.string().optional(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export default function ProductForm() {
  const { toast } = useToast();
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      imageUrl: 'https://picsum.photos/seed/newproduct/600/400' // Default placeholder
    }
  });

  const watchedDescription = watch('generatedDescription');
  const watchedProductName = watch('productName');
  const watchedProductCategory = watch('productCategory');
  const watchedKeyFeatures = watch('keyFeatures');
  const watchedTargetAudience = watch('targetAudience');

  const handleGenerateDescription = async () => {
    const input: GenerateProductDescriptionInput = {
      productName: getValues('productName'),
      productCategory: getValues('productCategory'),
      keyFeatures: getValues('keyFeatures'),
      targetAudience: getValues('targetAudience'),
    };

    if (!input.productName || !input.productCategory || !input.keyFeatures || !input.targetAudience) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in Product Name, Category, Key Features, and Target Audience to generate description.',
        variant: 'destructive',
      });
      return;
    }

    setIsGeneratingDesc(true);
    try {
      const result = await generateProductDescription(input);
      setValue('generatedDescription', result.productDescription);
      // Optionally set generated title if it's part of the same flow's output and good enough
      if(result.productTitle && !getValues('generatedTitle')) {
        setValue('generatedTitle', result.productTitle);
      }
      toast({
        title: 'AI Magic Complete!',
        description: 'Product description generated.',
      });
    } catch (error) {
      console.error('Error generating product description:', error);
      toast({
        title: 'AI Generation Failed',
        description: 'Could not generate product description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const handleGenerateTitle = async () => {
    const description = getValues('generatedDescription') || getValues('keyFeatures'); // Use generated desc or key features as fallback
    if (!description) {
      toast({
        title: 'Missing Information',
        description: 'Please provide key features or generate a description first to create a title.',
        variant: 'destructive',
      });
      return;
    }

    setIsGeneratingTitle(true);
    try {
      const result = await generateProductTitle({ productDescription: description });
      setValue('generatedTitle', result.productTitle);
      toast({
        title: 'AI Magic Complete!',
        description: 'Product title generated.',
      });
    } catch (error) {
      console.error('Error generating product title:', error);
      toast({
        title: 'AI Generation Failed',
        description: 'Could not generate product title. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    // In a real app, you would save this data to a database
    console.log('Product data submitted:', data);
    toast({
      title: 'Product Saved (Simulated)',
      description: `${data.generatedTitle || data.productName} has been "saved". Check console.`,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Product</CardTitle>
        <CardDescription>Fill in the product details and use AI to help generate content.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Basic Info for AI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="productName">Product Name (for AI)</Label>
              <Input id="productName" {...register('productName')} placeholder="e.g., Cozy Comfort Sofa" />
              {errors.productName && <p className="text-sm text-destructive mt-1">{errors.productName.message}</p>}
            </div>
            <div>
              <Label htmlFor="productCategory">Category (for AI)</Label>
              <Input id="productCategory" {...register('productCategory')} placeholder="e.g., Sofas, Living Room Furniture" />
              {errors.productCategory && <p className="text-sm text-destructive mt-1">{errors.productCategory.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="keyFeatures">Key Features (for AI, comma-separated)</Label>
            <Textarea id="keyFeatures" {...register('keyFeatures')} placeholder="e.g., Deep seating, Removable cushions, Durable fabric" />
            {errors.keyFeatures && <p className="text-sm text-destructive mt-1">{errors.keyFeatures.message}</p>}
          </div>
          <div>
            <Label htmlFor="targetAudience">Target Audience (for AI)</Label>
            <Input id="targetAudience" {...register('targetAudience')} placeholder="e.g., Families, Young professionals, Apartment dwellers" />
            {errors.targetAudience && <p className="text-sm text-destructive mt-1">{errors.targetAudience.message}</p>}
          </div>

          <hr className="my-6" />

          {/* AI Generated Content */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="generatedTitle">Generated Product Title</Label>
              <Button type="button" onClick={handleGenerateTitle} disabled={isGeneratingTitle || !watchedDescription} size="sm" variant="outline">
                <Sparkles className="mr-2 h-4 w-4" /> {isGeneratingTitle ? 'Generating...' : 'Generate Title'}
              </Button>
            </div>
            <Input id="generatedTitle" {...register('generatedTitle')} placeholder="AI will generate a title here..." />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="generatedDescription">Generated Product Description</Label>
               <Button 
                type="button" 
                onClick={handleGenerateDescription} 
                disabled={isGeneratingDesc || !watchedProductName || !watchedProductCategory || !watchedKeyFeatures || !watchedTargetAudience} 
                size="sm" 
                variant="outline"
              >
                <Wand2 className="mr-2 h-4 w-4" /> {isGeneratingDesc ? 'Generating...' : 'Generate Description'}
              </Button>
            </div>
            <Textarea id="generatedDescription" {...register('generatedDescription')} placeholder="AI will generate a description here..." rows={5} />
          </div>
          
          <hr className="my-6" />

          {/* Other Product Details */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" step="0.01" {...register('price')} placeholder="e.g., 799.99" />
            {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <Label htmlFor="materials">Materials</Label>
            <Input id="materials" {...register('materials')} placeholder="e.g., Solid wood frame, Polyester fabric" />
          </div>
          <div>
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input id="dimensions" {...register('dimensions')} placeholder="e.g., 84 W x 38 D x 36 H" />
          </div>
          <div>
            <Label htmlFor="careInstructions">Care Instructions</Label>
            <Textarea id="careInstructions" {...register('careInstructions')} placeholder="e.g., Spot clean with mild detergent." />
          </div>
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" {...register('imageUrl')} placeholder="https://example.com/image.jpg" />
             {errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" size="lg" disabled={isGeneratingDesc || isGeneratingTitle}>
            {(isGeneratingDesc || isGeneratingTitle) ? "AI is working..." : "Add Product (Simulate Save)"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
