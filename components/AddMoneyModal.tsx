'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddMoneyModalProps {
    onClose: () => void;
    onAdd: (transaction: { type: 'income'; amount: number; description: string }) => void;
}

export default function AddMoneyModal({ onClose, onAdd }: AddMoneyModalProps) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);

        if (numAmount > 0 && description.trim()) {
            onAdd({
                type: 'income',
                amount: numAmount,
                description: description.trim(),
            });
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            data-oid="jofg3en"
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm"
                data-oid="-jcmn9z"
            >
                <div className="flex justify-between items-center mb-4" data-oid="7wef3ak">
                    <h3
                        className="text-lg font-semibold text-gray-900 dark:text-white"
                        data-oid="g9i.4u_"
                    >
                        Add Money
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        data-oid="sew4w00"
                    >
                        <X size={20} data-oid="wig0bdx" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" data-oid="i-v:lw8">
                    <div data-oid="aoazphz">
                        <label
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            data-oid="t72.hmm"
                        >
                            Amount
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            required
                            data-oid="l3f73v3"
                        />
                    </div>

                    <div data-oid="t7l__6l">
                        <label
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            data-oid="wtw6xqw"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="e.g., Salary, Gift, etc."
                            required
                            data-oid="h5r6nzo"
                        />
                    </div>

                    <div className="flex space-x-3 pt-4" data-oid="bj6z0to">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            data-oid="xo0drrx"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                            data-oid="axa:775"
                        >
                            Add Money
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
