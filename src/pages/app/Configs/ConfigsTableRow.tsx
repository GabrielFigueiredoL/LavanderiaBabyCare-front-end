import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SquarePen } from 'lucide-react'
import { useState } from 'react'

import { productProps } from '@/api/productRequests/product'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { EditProductDialog } from './EditProductDialog'

export function ConfigsTableRow(product: productProps) {
  const [open, setOpen] = useState(false)
  return (
    <TableRow>
      <TableCell className="text-xs font-medium md:text-sm ">
        {product.name}
      </TableCell>
      <TableCell className="text-xs font-medium text-muted-foreground md:text-sm">
        {formatDistance(product.updatedAt, new Date(), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell className="text-right text-xs font-medium md:text-sm">
        {(product.price / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="text-right">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="xs">
              <SquarePen />
            </Button>
          </DialogTrigger>

          <EditProductDialog
            product={product}
            open={open}
            onOpenChange={setOpen}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
