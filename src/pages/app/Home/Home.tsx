import { useQuery } from '@tanstack/react-query'

import { getDailyOrders } from '@/api/orderRequests/getDailyOrders'
import { getDistrictAmountPerDay } from '@/api/orderRequests/getDistrictAmountPerDay'
import { OrderCardSkeleton } from '@/components/OrderCardSkeleton'
import { Pagination } from '@/components/pagination'

import { OrderCard } from '../../../components/OrderCard'
import { TableFilters } from '../../../components/TableFilters'
import { DailyOverviewCard } from './DailyOverviewCard'

export function Home() {
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: getDailyOrders,
  })

  const { data: districtAmountPerDay, isLoading } = useQuery({
    queryKey: ['DistrictAmountPerDay'],
    queryFn: getDistrictAmountPerDay,
  })

  console.log(districtAmountPerDay)

  return (
    <>
      <div className="relative flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <DailyOverviewCard
            isTitleWithdrawal
            data={districtAmountPerDay?.pickupOrders || []}
            isLoading={isLoading}
          />
          <DailyOverviewCard
            data={districtAmountPerDay?.deliveryOrders || []}
            isLoading={isLoading}
          />
        </div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Viagens do dia</h1>
          <TableFilters />
        </div>

        <div className="space-y-2.5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {ordersLoading ? (
              <>
                <OrderCardSkeleton />
                <OrderCardSkeleton />
                <OrderCardSkeleton />
              </>
            ) : orders?.length > 0 ? (
              orders?.map((order) => <OrderCard key={order.id} {...order} />)
            ) : (
              <div className="flex justify-center text-center md:col-span-2 lg:col-span-3">
                <h1 className="text-3xl font-bold tracking-tight">
                  Sem entregas para hoje
                </h1>
              </div>
            )}
          </div>
          {orders.length > 0 && <Pagination />}
        </div>
      </div>
    </>
  )
}
