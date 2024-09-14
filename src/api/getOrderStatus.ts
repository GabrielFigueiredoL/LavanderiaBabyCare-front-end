import { api } from '@/lib/axios'

export type orderStatusProps = {
  id: number
  name: string
}

export async function getOrderStatus() {
  const response = await api.get<orderStatusProps>('/order-status')
  return response.data
}
