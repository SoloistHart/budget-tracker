'use client';

import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction } from './BudgetTracker';

interface TransactionHistoryProps {
    transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getCategoryIcon = (category?: string) => {
        const iconMap: { [key: string]: string } = {
            'Food & Dining': '🍽️',
            Transportation: '🚗',
            Shopping: '🛍️',
            Entertainment: '🎬',
            'Bills & Utilities': '💡',
            Healthcare: '🏥',
            Education: '📚',
            Travel: '✈️',
            Groceries: '🛒',
            'Gas & Fuel': '⛽',
            Clothing: '👕',
            'Home & Garden': '🏠',
            'Personal Care': '💄',
            'Gifts & Donations': '🎁',
            Other: '📝',
        };
        return iconMap[category || 'Other'] || '📝';
    };

    if (transactions.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Transaction History
                </h3>
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Start by adding some money or expenses
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Transaction History
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                {transaction.type === 'income' ? (
                                    <ArrowUpCircle className="w-6 h-6 text-green-500" />
                                ) : (
                                    <div className="flex items-center space-x-1">
                                        <span className="text-lg">
                                            {getCategoryIcon(transaction.category)}
                                        </span>
                                        <ArrowDownCircle className="w-5 h-5 text-red-500" />
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {transaction.description}
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>{formatDate(transaction.date)}</span>
                                    {transaction.category && (
                                        <>
                                            <span>•</span>
                                            <span>{transaction.category}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <p
                                className={`text-sm font-semibold ${
                                    transaction.type === 'income'
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-600 dark:text-red-400'
                                }`}
                            >
                                {transaction.type === 'income' ? '+' : '-'}$
                                {transaction.amount.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
