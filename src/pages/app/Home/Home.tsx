import { Pagination } from '@/components/pagination'

import { ServicesCard } from '../../../components/ServicesCard'
import { DailyOverviewCard } from './DailyOverviewCard'
import { HomeFilters } from './HomeFilters'

const WithdrawalData = [
  {
    name: 'Asa Norte',
    amount: 2,
  },
  {
    name: 'Sudoeste',
    amount: 1,
  },
  {
    name: 'Aguas Claras',
    amount: 3,
  },
  {
    name: 'Noroeste',
    amount: 5,
  },
  {
    name: 'Asa Sul',
    amount: 3,
  },
]

const DeliveryData = [
  {
    name: 'Lago Norte',
    amount: 4,
  },
  {
    name: 'Asa Sul',
    amount: 8,
  },
  {
    name: 'Sudoeste',
    amount: 1,
  },
  {
    name: 'Gama',
    amount: 2,
  },
  {
    name: 'Nucleo Bandeirante',
    amount: 3,
  },
]

export function Home() {
  return (
    <>
      <div className="relative flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <DailyOverviewCard isTitleWithdrawal data={WithdrawalData} />
          <DailyOverviewCard data={DeliveryData} />
        </div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Viagens do dia</h1>
          <HomeFilters />
        </div>

        <div className="space-y-2.5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
            <ServicesCard />
          </div>
          <Pagination />
        </div>
      </div>
    </>
  )
}
