// interface Props { }

import { SquarePen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { EditProductDialog } from './EditProductDialog'

export function ConfigsTableRow() {
  return (
    <TableRow>
      <TableCell className="text-xs font-medium md:text-sm ">
        Carrinho Tradicional
      </TableCell>
      <TableCell className="text-xs font-medium text-muted-foreground md:text-sm">
        Há 7 anos atrás
      </TableCell>
      <TableCell className="text-right text-xs font-medium md:text-sm">
        R$ 79,90
      </TableCell>
      <TableCell className="text-right">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="xs">
              <SquarePen />
            </Button>
          </DialogTrigger>

          <EditProductDialog />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
