import { Account, Transaction } from '../types';

// Simulated API response delay
const DELAY = 500;

// Mock data
const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Main Checking',
    balance: 4385.25,
    transactions: [
      {
        id: '1',
        date: '2024-03-15',
        description: 'Netflix Subscription',
        amount: -15.99,
        category: 'Entertainment',
        isRecurring: true,
        merchantLogo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=50&h=50&fit=crop'
      },
      {
        id: '2',
        date: '2024-03-14',
        description: 'Unknown Online Store',
        amount: -299.99,
        category: 'Shopping',
        isFraudSuspect: true,
        merchantLogo: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=50&h=50&fit=crop'
      },
      {
        id: '3',
        date: '2024-03-14',
        description: 'Grocery Store',
        amount: -85.47,
        category: 'Groceries',
        merchantLogo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=50&h=50&fit=crop'
      },
      {
        id: '4',
        date: '2024-03-13',
        description: 'Salary Deposit',
        amount: 3500.00,
        category: 'Income',
        merchantLogo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=50&h=50&fit=crop'
      }
    ]
  }
];

export const api = {
  async getAccounts(): Promise<Account[]> {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    return [...mockAccounts];
  },

  async getAccount(id: string): Promise<Account | null> {
    await new Promise(resolve => setTimeout(resolve, DELAY));
    return mockAccounts.find(account => account.id === id) || null;
  },

  async uploadStatement(file: File): Promise<{ success: boolean; message: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:4000/api/upload/pdf', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload file');
    }

    return response.json();
  }
};