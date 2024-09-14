import { api } from '@/lib/axios'

export type districtAmountPerDay = {
  district: string
  amount: number
}

export type getDistrictAmountPerDayResponse = {
  deliveryOrders: districtAmountPerDay[]
  pickupOrders: districtAmountPerDay[]
}

export async function getDistrictAmountPerDay() {
  const response = await api.get<getDistrictAmountPerDayResponse>(
    '/orders/daily-orders/districts',
  )
  return response.data
}
