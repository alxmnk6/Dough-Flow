import { useState, useEffect } from 'react';
import { Account } from '../types';
import { api } from '../services/api';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await api.getAccounts();
        setAccounts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { accounts, loading, error };
}