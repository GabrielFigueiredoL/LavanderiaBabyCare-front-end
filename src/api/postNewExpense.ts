import { api } from '@/lib/axios'

interface NewExpenseProps {
  id: string
  description: string
  created_at: Date
  category: {
    id: string
    name: string
  }
  value: number
}

export async function postNewExpense(expense: NewExpenseProps) {
  await api.post('/expenses', expense)
}
