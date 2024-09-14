import { OrderStatus } from '@/components/OrderStatus'

import { selectedProduct } from '../productRequests/product'

export type OrderDetailsProps = {
  id: string
  number: string
  clientName: string
  clientPhone: string
  pickupDate: Date
  deliveryDate: Date
  cep: string
  address: string
  district: string
  complement: string
  shipping: number
  discount: number
  status: {
    id: number
    name: OrderStatus
  }
  selectedItems: selectedProduct[]
}

type OrderProductResponse = selectedProduct & {
  subTotal: number
}

export type OrderDetailsPropsResponse = {
  id: string
  number: string
  clientName: string
  clientPhone: string
  pickupDate: Date
  deliveryDate: Date
  cep: string
  address: string
  district: string
  complement: string
  shipping: number
  discount: number
  status: {
    id: number
    name: OrderStatus
  }
  selectedItems: OrderProductResponse[]
  total: number
  itemsTotal: number
}
