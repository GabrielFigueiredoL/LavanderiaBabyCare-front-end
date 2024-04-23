import { api } from '@/lib/axios'

export interface ExpensesCategoryPropsResponse {
  id: string
  name: string
}

export async function getExpensesCategory() {
  const response =
    await api.get<ExpensesCategoryPropsResponse[]>('/expenses-category')
  return response.data
}
