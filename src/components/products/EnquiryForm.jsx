
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sendProductEnquiry } from '@/app/actions/send-enquiry-action';

const enquiryFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function EnquiryForm({ product, onSuccess }) {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(enquiryFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Access product name and ID from Strapi structure
      const productName = product.attributes.ProductName;
      const productId = product.id; // Strapi's top-level ID for the entry

      const result = await sendProductEnquiry({
        ...data,
        productName: productName,
        productId: productId,
      });

      if (result.success) {
        toast({
          title: 'Enquiry Sent!',
          description: 'We have received your enquiry and will get back to you soon.',
        });
        reset();
        if (onSuccess) onSuccess();
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to send enquiry. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name-enquiry">Full Name</Label>
        <Input id="name-enquiry" {...register('name')} placeholder="John Doe" />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email-enquiry">Email Address</Label>
        <Input id="email-enquiry" type="email" {...register('email')} placeholder="john.doe@example.com" />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="message-enquiry">Message</Label>
        <Textarea id="message-enquiry" {...register('message')} placeholder="Your enquiry..." rows={4} />
        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send Enquiry'}
      </Button>
    </form>
  );
}
