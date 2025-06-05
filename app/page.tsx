'use client';

import BudgetTracker from '@/components/BudgetTracker';

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <BudgetTracker />
        </div>
    );
}
