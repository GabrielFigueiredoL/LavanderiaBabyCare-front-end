import { api } from '@/lib/axios'

interface NewServiceProps {
  price: number
  name: string
  id: string
  updated_at: Date
}

export async function postNewService(service: NewServiceProps) {
  await api.post('/services', service)
}
