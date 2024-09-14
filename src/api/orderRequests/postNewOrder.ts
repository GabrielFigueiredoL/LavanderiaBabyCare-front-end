import { api } from '@/lib/axios'

import { OrderDetailsProps } from './order'

export async function postNewOrder(order: OrderDetailsProps) {
  await api.post('/orders', order)
}
