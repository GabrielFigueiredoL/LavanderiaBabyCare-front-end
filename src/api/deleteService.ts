import { api } from '@/lib/axios'

export async function deleteService(serviceId: string) {
  await api.delete(`/services/${serviceId}`)
}
