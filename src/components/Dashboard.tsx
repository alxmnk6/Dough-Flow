import React from 'react';
import { CreditCard, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { Transaction } from '../types';
import { useAccounts } from '../hooks/useAccounts';

export function Dashboard() {
  const { accounts, loading, error } = useAccounts();
  const account = accounts[0]; // For demo, we'll use the first account

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">No accounts found</div>
      </div>
    );
  }

  const recurringCount = account.transactions.filter(t => t.isRecurring).length;
  const fraudCount = account.transactions.filter(t => t.isFraudSuspect).length;
  const monthlySpending = account.transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Balance"
          value={`$${account.balance.toFixed(2)}`}
          icon={<CreditCard className="h-6 w-6 text-blue-500" />}
          trend="+2.5%"
        />
        <DashboardCard
          title="Monthly Spending"
          value={`$${monthlySpending.toFixed(2)}`}
          icon={<TrendingUp className="h-6 w-6 text-green-500" />}
          trend="-5.2%"
        />
        <DashboardCard
          title="Suspicious Activity"
          value={`${fraudCount} Alert${fraudCount !== 1 ? 's' : ''}`}
          icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
        />
        <DashboardCard
          title="Recurring Payments"
          value={`${recurringCount} Active`}
          icon={<RefreshCw className="h-6 w-6 text-purple-500" />}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {account.transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend?: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {trend && (
          <span className={`ml-2 text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <img
          src={transaction.merchantLogo}
          alt=""
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {transaction.isRecurring && (
          <RefreshCw className="h-4 w-4 text-purple-500" />
        )}
        {transaction.isFraudSuspect && (
          <AlertTriangle className="h-4 w-4 text-red-500" />
        )}
        <span className={`text-sm font-medium ${
          transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
        }`}>
          ${Math.abs(transaction.amount).toFixed(2)}
        </span>
      </div>
    </div>
  );
}