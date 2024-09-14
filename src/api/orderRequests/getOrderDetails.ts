import { api } from '@/lib/axios'

import { OrderDetailsPropsResponse } from './order'

interface OrderProps {
  orderId: string
}

export async function getOrderDetails({ orderId }: OrderProps) {
  const response = await api.get<OrderDetailsPropsResponse>(
    `/orders/${orderId}`,
  )
  return response.data
}
