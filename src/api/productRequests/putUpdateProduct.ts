import { api } from '@/lib/axios'

import { productProps } from './product'

export async function putUpdateProduct(product: productProps) {
  await api.put(`/products/${product.id}`, product)
}
