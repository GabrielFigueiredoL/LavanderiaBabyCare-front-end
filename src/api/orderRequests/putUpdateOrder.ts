import { api } from '@/lib/axios'

import { OrderDetailsPropsResponse } from './order'

export async function putUpdateOrder(order: OrderDetailsPropsResponse) {
  await api.put(`/orders/${order.id}`, order)
}
