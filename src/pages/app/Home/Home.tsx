import { useQuery } from '@tanstack/react-query'

import { getDeliveries } from '@/api/getDeliveries'
import { DeliveryData, WithdrawalData } from '@/assets/testData.ts'
import { Pagination } from '@/components/pagination'

import { DeliveryCard } from '../../../components/DeliveryCard'
import { TableFilters } from '../../../components/TableFilters'
import { DailyOverviewCard } from './DailyOverviewCard'

export function Home() {
  const { data: deliveries } = useQuery({
    queryKey: ['deliveries'],
    queryFn: getDeliveries,
  })

  return (
    <>
      <div className="relative flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <DailyOverviewCard isTitleWithdrawal data={WithdrawalData} />
          <DailyOverviewCard data={DeliveryData} />
        </div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Viagens do dia</h1>
          <TableFilters />
        </div>

        <div className="space-y-2.5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {deliveries?.map((delivery) => (
              <DeliveryCard key={delivery.id} delivery={delivery} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </>
  )
}
