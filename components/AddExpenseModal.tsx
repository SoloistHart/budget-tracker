'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface AddExpenseModalProps {
    onClose: () => void;
    onAdd: (transaction: {
        type: 'expense';
        amount: number;
        description: string;
        category: string;
    }) => void;
    remainingBudget: number;
}

const EXPENSE_CATEGORIES = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Groceries',
    'Gas & Fuel',
    'Clothing',
    'Home & Garden',
    'Personal Care',
    'Gifts & Donations',
    'Other',
];

export default function AddExpenseModal({ onClose, onAdd, remainingBudget }: AddExpenseModalProps) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);

        if (numAmount > 0 && description.trim() && category) {
            onAdd({
                type: 'expense',
                amount: numAmount,
                description: description.trim(),
                category,
            });
            onClose();
        }
    };

    const willExceedBudget = parseFloat(amount) > remainingBudget && remainingBudget > 0;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            data-oid="m:7t.qy"
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto"
                data-oid="tfv4c97"
            >
                <div className="flex justify-between items-center mb-4" data-oid="k:lx_8_">
                    <h3
                        className="text-lg font-semibold text-gray-900 dark:text-white"
                        data-oid="3k8h1nt"
                    >
                        Add Expense
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        data-oid="ocano7:"
                    >
                        <X size={20} data-oid="k_.7.sp" />
                    </button>
                </div>

                {remainingBudget > 0 && (
                    <div
                        className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                        data-oid="unosxji"
                    >
                        <p className="text-sm text-blue-700 dark:text-blue-400" data-oid="07_v8:u">
                            Remaining budget:{' '}
                            <span className="font-medium" data-oid="e2b3mkt">
                                ${remainingBudget.toFixed(2)}
                            </span>
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" data-oid="u_013dv">
                    <div data-oid=".9kg8-c">
                        <label
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            data-oid="yhwcck2"
                        >
                            Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            required
                            data-oid="gs1dq5w"
                        />

                        {willExceedBudget && (
                            <div
                                className="mt-2 flex items-center space-x-2 text-yellow-600 dark:text-yellow-400"
                                data-oid="79737r2"
                            >
                                <AlertTriangle size={16} data-oid="pxqid3:" />
                                <span className="text-sm" data-oid=":178zch">
                                    This will exceed your remaining budget
                                </span>
                            </div>
                        )}
                    </div>

                    <div data-oid="y3nmtzj">
                        <label
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            data-oid="nqmc_zp"
                        >
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                            data-oid="156v8us"
                        >
                            <option value="" data-oid="6r_mwm5">
                                Select a category
                            </option>
                            {EXPENSE_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat} data-oid="_tw8zgw">
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div data-oid="cosifvv">
                        <label
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            data-oid="79o0u31"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="e.g., Lunch, Gas, etc."
                            required
                            data-oid="ygloxhc"
                        />
                    </div>

                    <div className="flex space-x-3 pt-4" data-oid="mg_hyp8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            data-oid="96__t7f"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                            data-oid="kct_z.6"
                        >
                            Add Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
