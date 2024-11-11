export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  isRecurring?: boolean;
  isFraudSuspect?: boolean;
  merchantLogo?: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  transactions: Transaction[];
} 