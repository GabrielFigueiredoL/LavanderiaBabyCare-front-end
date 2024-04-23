import { api } from '@/lib/axios'

export interface DeliveryPropsResponse {
  id: string
  number: string
  name: string
  phone: string
  withdrawalDate: Date
  deliveryDate: Date
  cep: string
  adress: string
  district: string
  complement: string
  freightage: number
  discount: number
  status:
    | 'toBeWithdrawn'
    | 'withdrawn'
    | 'processing'
    | 'toBeDelivery'
    | 'delivered'
    | 'toBePaid'
    | 'paid'
  selectedItems: {
    service: {
      name: string
      price: number
    }
    amount: number
  }[]
}

export async function getDeliveries() {
  const response = await api.get<DeliveryPropsResponse[]>('/deliveries')
  return response.data
}
