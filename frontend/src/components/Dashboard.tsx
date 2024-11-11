import React from 'react';
import { CreditCard, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Balance"
          value="$4,385.25"
          icon={<CreditCard className="h-6 w-6 text-blue-500" />}
          trend="+2.5%"
        />
        <DashboardCard
          title="Monthly Spending"
          value="$2,345.67"
          icon={<TrendingUp className="h-6 w-6 text-green-500" />}
          trend="-5.2%"
        />
        <DashboardCard
          title="Suspicious Activity"
          value="2 Alerts"
          icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
        />
        <DashboardCard
          title="Recurring Payments"
          value="8 Active"
          icon={<RefreshCw className="h-6 w-6 text-purple-500" />}
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

function DashboardCard({ title, value, icon, trend }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div>{icon}</div>
      </div>
      {trend && (
        <p className="mt-2 text-sm text-green-600">
          {trend}
        </p>
      )}
    </div>
  );
} 