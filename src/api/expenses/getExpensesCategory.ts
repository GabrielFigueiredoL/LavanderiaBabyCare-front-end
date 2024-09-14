import { api } from '@/lib/axios'

export type ExpensesCategoryPropsResponse = {
  id: number
  name: string
}

export async function getExpensesCategory() {
  const response = await api.get<ExpensesCategoryPropsResponse[]>(
    '/expenses/categories',
  )
  return response.data
}
