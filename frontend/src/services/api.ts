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
      // ... other transactions
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