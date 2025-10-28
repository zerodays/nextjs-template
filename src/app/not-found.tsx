import Link from 'next/link';
import { Button } from '@/components/ui/button';
import './globals.css';

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col gap-y-4 items-center justify-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="font-mono text-muted-foreground">Page not found</p>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </body>
    </html>
  );
}
