import { Expense } from "../types";

const STORAGE_KEY = 'nhanhchitieu_data_v1';

export const loadExpenses = (): Expense[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load expenses", e);
    return [];
  }
};

export const saveExpenses = (expenses: Expense[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (e) {
    console.error("Failed to save expenses", e);
  }
};
