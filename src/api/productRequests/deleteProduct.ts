import { api } from '@/lib/axios'

export async function deleteProduct(productId: string) {
  await api.delete(`/products/${productId}`)
}
