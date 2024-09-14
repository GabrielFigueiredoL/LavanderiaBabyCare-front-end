import { api } from '@/lib/axios'

import { ExpensesCategoryPropsResponse } from './getExpensesCategory'

interface NewExpenseProps {
  id: string
  description: string
  created_at: Date
  category: ExpensesCategoryPropsResponse
  price: number
}

export async function postNewExpense(expense: NewExpenseProps) {
  await api.post('/expenses', expense)
}
