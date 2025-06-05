'use client';

import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

interface BalanceCardProps {
    balance: number;
    setBalance: (balance: number) => void;
}

export default function BalanceCard({ balance, setBalance }: BalanceCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(balance.toString());

    const handleSave = () => {
        const newBalance = parseFloat(editValue);
        if (!isNaN(newBalance) && newBalance >= 0) {
            setBalance(newBalance);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditValue(balance.toString());
        setIsEditing(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Current Balance
                </h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <Edit2 size={16} />
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="flex items-center space-x-2">
                    <div className="flex-1">
                        <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="p-1 text-green-600 hover:text-green-700 transition-colors"
                    >
                        <Check size={20} />
                    </button>
                    <button
                        onClick={handleCancel}
                        className="p-1 text-red-600 hover:text-red-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    ₱{balance.toFixed(2)}
                </p>
            )}
        </div>
    );
}
