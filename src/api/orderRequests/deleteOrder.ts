import { api } from '@/lib/axios'

export async function deleteOrder(orderId: string) {
  await api.delete(`/orders/${orderId}`)
}
