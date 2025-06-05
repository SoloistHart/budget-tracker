'use client';

import { useState } from 'react';
import { Edit2, Check, X, Target } from 'lucide-react';

interface BudgetCardProps {
    monthlyBudget: number;
    setMonthlyBudget: (budget: number) => void;
    currentExpenses: number;
    remainingBudget: number;
}

export default function BudgetCard({
    monthlyBudget,
    setMonthlyBudget,
    currentExpenses,
    remainingBudget,
}: BudgetCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(monthlyBudget.toString());

    const handleSave = () => {
        const newBudget = parseFloat(editValue);
        if (!isNaN(newBudget) && newBudget >= 0) {
            setMonthlyBudget(newBudget);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditValue(monthlyBudget.toString());
        setIsEditing(false);
    };

    const budgetPercentage = monthlyBudget > 0 ? (currentExpenses / monthlyBudget) * 100 : 0;
    const isOverBudget = remainingBudget < 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <Target size={20} className="text-blue-500" />
                    <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Monthly Budget
                    </h2>
                </div>
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
                <div className="flex items-center space-x-2 mb-4">
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    ₱{monthlyBudget.toFixed(2)}
                </p>
            )}

            {/* Budget Progress */}
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Spent this month</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        ₱{currentExpenses.toFixed(2)}
                    </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ₱{
                            isOverBudget
                                ? 'bg-red-500'
                                : budgetPercentage > 80
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                        }`}
                        style={{ width: `₱{Math.min(budgetPercentage, 100)}%` }}
                    ></div>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Remaining</span>
                    <span
                        className={`font-medium ₱{isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
                    >
                        {remainingBudget.toFixed(2)}
                    </span>
                </div>

                {isOverBudget && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                            ⚠️ You've exceeded your monthly budget by
                            {Math.abs(remainingBudget).toFixed(2)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
