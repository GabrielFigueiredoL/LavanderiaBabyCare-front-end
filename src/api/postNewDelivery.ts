import { api } from '@/lib/axios'

interface DeliveryProps {
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

export async function postNewDelivery(delivery: DeliveryProps) {
  await api.post('/deliveries', delivery)
}
