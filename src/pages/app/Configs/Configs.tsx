import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import { getServices } from '@/api/getServices'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ConfigsTableRow } from './ConfigsTableRow'
import { NewServiceDialog } from './NewServiceDialog'

export function Configs() {
  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h1 className=" text-3xl font-bold tracking-tight">Produtos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="md:hidden" />
              <span className="hidden md:block">Adicionar produto</span>
            </Button>
          </DialogTrigger>

          <NewServiceDialog />
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[180px]">Ultima alteração</TableHead>
              <TableHead className="w-[140px] text-right">Valor</TableHead>
              <TableHead className="w-[64px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service) => (
              <ConfigsTableRow service={service} key={service.id} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
