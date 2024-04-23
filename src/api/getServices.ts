import { api } from '@/lib/axios'

export interface ServicePropsResponse {
  id: string
  name: string
  price: number
  updated_at: Date
}

export async function getServices() {
  const response = await api.get<ServicePropsResponse[]>('/services')
  return response.data
}
