import { api } from '@/lib/axios'

import { productProps } from './product'

export async function getProducts() {
  const response = await api.get<productProps[]>('/products')
  return response.data
}
