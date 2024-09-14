import { api } from '@/lib/axios'

import { OrderDetailsPropsResponse } from './order'

export async function getDailyOrders() {
  const response = await api.get<OrderDetailsPropsResponse[]>(
    '/orders/daily-orders',
  )
  return response.data
}
