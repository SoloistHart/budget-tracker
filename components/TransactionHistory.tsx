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
            <div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                data-oid="-uz14wv"
            >
                <h3
                    className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                    data-oid="t1a1c1s"
                >
                    Transaction History
                </h3>
                <div className="text-center py-8" data-oid=".pmfu7n">
                    <p className="text-gray-500 dark:text-gray-400" data-oid="-re3e29">
                        No transactions yet
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1" data-oid="t75-lrx">
                        Start by adding some money or expenses
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            data-oid="6kz9ztc"
        >
            <h3
                className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                data-oid="sp:7fxc"
            >
                Transaction History
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto" data-oid="8:hio-b">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        data-oid="1paolrd"
                    >
                        <div className="flex items-center space-x-3" data-oid="e2r7gb1">
                            <div className="flex-shrink-0" data-oid="secq3y9">
                                {transaction.type === 'income' ? (
                                    <ArrowUpCircle
                                        className="w-6 h-6 text-green-500"
                                        data-oid=":rrx3t8"
                                    />
                                ) : (
                                    <div className="flex items-center space-x-1" data-oid="z.s.ov3">
                                        <span className="text-lg" data-oid="b9wtd.z">
                                            {getCategoryIcon(transaction.category)}
                                        </span>
                                        <ArrowDownCircle
                                            className="w-5 h-5 text-red-500"
                                            data-oid="5.1ul_u"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1" data-oid="j1df1ck">
                                <p
                                    className="text-sm font-medium text-gray-900 dark:text-white truncate"
                                    data-oid="p2vl9p1"
                                >
                                    {transaction.description}
                                </p>
                                <div
                                    className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400"
                                    data-oid="861j65i"
                                >
                                    <span data-oid="jopar1i">{formatDate(transaction.date)}</span>
                                    {transaction.category && (
                                        <>
                                            <span data-oid="73k54.o">•</span>
                                            <span data-oid="0k70dve">{transaction.category}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="text-right" data-oid="sunku.9">
                            <p
                                className={`text-sm font-semibold ${
                                    transaction.type === 'income'
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-600 dark:text-red-400'
                                }`}
                                data-oid="icx29be"
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
