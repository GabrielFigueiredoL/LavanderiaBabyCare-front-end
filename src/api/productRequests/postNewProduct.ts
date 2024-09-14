import { api } from '@/lib/axios'

import { productProps } from './product'

export async function postNewProduct(product: productProps) {
  await api.post('/products', product)
}
