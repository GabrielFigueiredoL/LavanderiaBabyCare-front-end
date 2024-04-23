import { api } from '@/lib/axios'

interface UpdateServiceBody {
  id: string
  price: number
  name: string
  updated_at: Date
}

export async function putUpdateService(service: UpdateServiceBody) {
  await api.put(`/services/${service.id}`, service)
}
