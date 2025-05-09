'use server';

/**
 * @fileOverview AI-powered product description generator.
 *
 * - generateProductDescription - A function that generates product descriptions.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productCategory: z.string().describe('The category of the product.'),
  keyFeatures: z.string().describe('Key features of the product.'),
  targetAudience: z.string().describe('The target audience for the product.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  productTitle: z.string().describe('The generated title of the product.'),
  productDescription: z.string().describe('The generated description of the product.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const generateProductDescriptionPrompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an AI assistant specializing in creating compelling product descriptions and titles for e-commerce websites.

  Based on the information provided, generate a product title and a detailed, engaging product description.
  The description should highlight the key features and benefits of the product, appealing to the specified target audience.

  Product Name: {{{productName}}}
  Product Category: {{{productCategory}}}
  Key Features: {{{keyFeatures}}}
  Target Audience: {{{targetAudience}}}

  Ensure the product title is catchy and accurately reflects the product.
  The product description should be informative, persuasive, and optimized for online sales.
  Do not include any promotional content in the generated title and description.
  Do not include any pricing information.
  Do not include any warranty information.
  Do not assume any specific materials.
  Do not assume any dimensions.
  Do not include any shipping information.
  Do not include any store specific details.
  Do not include any contact information.
`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateProductDescriptionPrompt(input);
    return output!;
  }
);
