import { api } from '@/lib/axios'

import { OrderDetailsPropsResponse } from './order'

export async function getOrders() {
  const response = await api.get<OrderDetailsPropsResponse[]>('/orders')
  return response.data
}
