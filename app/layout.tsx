import type { Metadata } from 'next';
import './globals.css';
import Script from "next/script";
export const metadata: Metadata = {
  title: 'Budget Tracker - Manage Your Finances',
  description: 'A comprehensive budget tracking app to manage your income, expenses, and monthly budgets with dark mode support.'
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en" data-oid="ulz4fjd">
            <body className="" data-oid="8xp:kxx">
                {children}
            
                <Script src="/builtwith.js" strategy="afterInteractive" />
            </body>
        </html>;
}