'use client';

import { useState, useEffect } from 'react';
import { Plus, Wallet, Target, History, Moon, Sun } from 'lucide-react';
import BalanceCard from './BalanceCard';
import BudgetCard from './BudgetCard';
import AddMoneyModal from './AddMoneyModal';
import AddExpenseModal from './AddExpenseModal';
import TransactionHistory from './TransactionHistory';

export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    category?: string;
    description: string;
    date: Date;
}

export default function BudgetTracker() {
    const [balance, setBalance] = useState(0);
    const [monthlyBudget, setMonthlyBudget] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [showAddMoney, setShowAddMoney] = useState(false);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedBalance = localStorage.getItem('budget-balance');
        const savedBudget = localStorage.getItem('budget-monthly');
        const savedTransactions = localStorage.getItem('budget-transactions');
        const savedDarkMode = localStorage.getItem('budget-darkmode');

        if (savedBalance) setBalance(parseFloat(savedBalance));
        if (savedBudget) setMonthlyBudget(parseFloat(savedBudget));
        if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
        if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    }, []);

    // Save data to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('budget-balance', balance.toString());
    }, [balance]);

    useEffect(() => {
        localStorage.setItem('budget-monthly', monthlyBudget.toString());
    }, [monthlyBudget]);

    useEffect(() => {
        localStorage.setItem('budget-transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('budget-darkmode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: Date.now().toString(),
            date: new Date(),
        };

        setTransactions((prev) => [newTransaction, ...prev]);

        if (transaction.type === 'income') {
            setBalance((prev) => prev + transaction.amount);
        } else {
            setBalance((prev) => prev - transaction.amount);
        }
    };

    const getCurrentMonthExpenses = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return transactions
            .filter((t) => {
                const transactionDate = new Date(t.date);
                return (
                    t.type === 'expense' &&
                    transactionDate.getMonth() === currentMonth &&
                    transactionDate.getFullYear() === currentYear
                );
            })
            .reduce((total, t) => total + t.amount, 0);
    };

    const remainingBudget = monthlyBudget - getCurrentMonthExpenses();

    return (
        <div
            className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
            data-oid="z1ia4ll"
        >
            {/* Header */}
            <div
                className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
                data-oid="v3ffitm"
            >
                <div
                    className="max-w-md mx-auto px-4 py-4 flex justify-between items-center"
                    data-oid="edyc-d5"
                >
                    <h1
                        className="text-xl font-bold text-gray-900 dark:text-white"
                        data-oid="801jdjt"
                    >
                        Budget Tracker
                    </h1>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        data-oid="1ticxqt"
                    >
                        {darkMode ? (
                            <Sun size={20} data-oid="r:5z6aj" />
                        ) : (
                            <Moon size={20} data-oid="6um0vee" />
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-md mx-auto p-4 space-y-4" data-oid="7jqbf:i">
                {/* Balance and Budget Cards */}
                <BalanceCard balance={balance} setBalance={setBalance} data-oid="q45zwww" />
                <BudgetCard
                    monthlyBudget={monthlyBudget}
                    setMonthlyBudget={setMonthlyBudget}
                    currentExpenses={getCurrentMonthExpenses()}
                    remainingBudget={remainingBudget}
                    data-oid="dg1zu86"
                />

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3" data-oid="jc8ljx0">
                    <button
                        onClick={() => setShowAddMoney(true)}
                        className="flex flex-col items-center justify-center p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        data-oid="6iz5eft"
                    >
                        <Plus size={24} data-oid="o6urg3o" />
                        <span className="text-sm mt-1" data-oid="indw469">
                            Add Money
                        </span>
                    </button>

                    <button
                        onClick={() => setShowAddExpense(true)}
                        className="flex flex-col items-center justify-center p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        data-oid="ho25mbc"
                    >
                        <Wallet size={24} data-oid="hv2w_01" />
                        <span className="text-sm mt-1" data-oid="wx3c68a">
                            Add Expense
                        </span>
                    </button>

                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="flex flex-col items-center justify-center p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        data-oid="yg4n06:"
                    >
                        <History size={24} data-oid="-t8g928" />
                        <span className="text-sm mt-1" data-oid="env2l_.">
                            History
                        </span>
                    </button>
                </div>

                {/* Transaction History */}
                {showHistory && (
                    <TransactionHistory transactions={transactions} data-oid="upm.j_x" />
                )}
            </div>

            {/* Modals */}
            {showAddMoney && (
                <AddMoneyModal
                    onClose={() => setShowAddMoney(false)}
                    onAdd={addTransaction}
                    data-oid="5-t--fk"
                />
            )}

            {showAddExpense && (
                <AddExpenseModal
                    onClose={() => setShowAddExpense(false)}
                    onAdd={addTransaction}
                    remainingBudget={remainingBudget}
                    data-oid="ru79:5d"
                />
            )}
        </div>
    );
}
