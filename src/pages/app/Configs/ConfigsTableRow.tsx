import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SquarePen } from 'lucide-react'
import { useState } from 'react'

import { ServicePropsResponse } from '@/api/getServices'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { EditServiceDialog } from './EditServiceDialog'

interface ServiceProps {
  service: ServicePropsResponse
}

export function ConfigsTableRow({ service }: ServiceProps) {
  const [open, setOpen] = useState(false)
  return (
    <TableRow>
      <TableCell className="text-xs font-medium md:text-sm ">
        {service.name}
      </TableCell>
      <TableCell className="text-xs font-medium text-muted-foreground md:text-sm">
        {formatDistance(service.updated_at, new Date(), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell className="text-right text-xs font-medium md:text-sm">
        {(service.price / 100).toLocaleString('pt-BR', {
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

          <EditServiceDialog
            service={service}
            open={open}
            onOpenChange={setOpen}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
