import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getDeliveries } from '@/api/getDeliveries'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'

import { DeliveryCard } from '../../../components/DeliveryCard'
import { TableFilters } from '../../../components/TableFilters'

export function Deliveries() {
  const navigate = useNavigate()
  const { data: deliveries } = useQuery({
    queryKey: ['deliveries'],
    queryFn: getDeliveries,
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
