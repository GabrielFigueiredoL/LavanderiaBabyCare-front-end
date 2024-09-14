import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { getProducts } from '@/api/productRequests/getProducts'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ConfigsTableRow } from './ConfigsTableRow'
import { NewProductDialog } from './NewProductDialog'

export function Configs() {
  const [open, setOpen] = useState(false)
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h1 className=" text-3xl font-bold tracking-tight">Produtos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="md:hidden" />
              <span className="hidden md:block">Adicionar produto</span>
            </Button>
          </DialogTrigger>

          <NewProductDialog open={open} setOpen={setOpen} />
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
            {products?.map((order) => (
              <ConfigsTableRow key={order.id} {...order} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
