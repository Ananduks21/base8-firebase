
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading1 } from 'lucide-react';

const pageHeadings = [
  { title: 'Welcome to Base8', path: '/' },
  { title: 'Our Products', path: '/products' },
  { title: 'About Base8', path: '/about' },
  { title: 'Get in Touch', path: '/contact' },
  { title: 'Manage Products', path: '/admin/products' },
];

export default function AllHeadingsPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Site Headings Overview
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A quick overview of the main sections available on our website. Click any heading to navigate to the respective page.
        </p>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Heading1 className="w-6 h-6 mr-2 text-primary" />
            Main Page Headings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {pageHeadings.map((heading) => (
              <li key={heading.path} className="border-b pb-2 last:border-b-0 last:pb-0">
                <Link href={heading.path} className="text-lg font-semibold text-primary hover:underline">
                  {heading.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  Path: <code className="bg-muted p-1 rounded-sm text-xs">{heading.path}</code>
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
