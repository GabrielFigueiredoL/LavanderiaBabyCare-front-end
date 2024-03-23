import { Pagination } from '@/components/pagination'

import { ServicesCard } from '../../../components/ServicesCard'
import { HomeFilters } from './HomeFilters'

export function Home() {
  return (
    <>
      <div className="relative flex flex-col gap-4">
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
