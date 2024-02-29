import { MainTableRow } from '@/components/MainTableRow'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { HomeTableFilters } from './HomeTableFilters'

export function Home() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Viagens do dia</h1>
        <div className="space-y-2.5">
          <HomeTableFilters />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[180px]">Bairro</TableHead>
                  <TableHead>Logradouro</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <MainTableRow />
                <MainTableRow />
                <MainTableRow />
                <MainTableRow />
                <MainTableRow />
                <MainTableRow />
                <MainTableRow />
              </TableBody>
            </Table>
          </div>
          <Pagination />
        </div>
      </div>
    </>
  )
}
