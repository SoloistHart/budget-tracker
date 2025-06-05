import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'Budget Tracker - Manage Your Finances',
    description:
        'A comprehensive budget tracking app to manage your income, expenses, and monthly budgets with dark mode support.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="">{children}</body>
        </html>
    );
}
