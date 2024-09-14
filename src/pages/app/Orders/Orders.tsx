import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getOrders } from '@/api/orderRequests/getOrders'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'

import { OrderCard } from '../../../components/OrderCard'
import { TableFilters } from '../../../components/TableFilters'

export function Orders() {
  const navigate = useNavigate()
  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })
  return (
    <>
      <div className="relative flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Todas as entregas
          </h1>
          <div className="flex gap-4">
            <TableFilters />
            <Button onClick={() => navigate('/new')}>
              <Plus />
              <span className="ml-2 hidden md:block">Adicionar entrega</span>
            </Button>
          </div>
        </div>

        {orders?.length > 0 ? (
          <div className="space-y-2.5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {orders?.map((order) => <OrderCard key={order.id} {...order} />)}
            </div>
            <Pagination />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Sem entregas...
            </h1>
          </div>
        )}
      </div>
    </>
  )
}
