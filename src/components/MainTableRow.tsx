// interface Props { }

import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { ArrowRight, Search } from 'lucide-react'

import { TableCell, TableRow } from '@/components/ui/table'

import { ServiceDetails } from './ServiceDetails'
import { Button } from './ui/button'

export function MainTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do serviço</span>
            </Button>
          </DialogTrigger>

          <ServiceDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        821e78f7asdhdf128h
      </TableCell>
      <TableCell className="font-medium">Gabriel</TableCell>
      <TableCell className="text-muted-foreground">Sudoeste</TableCell>
      <TableCell>SQSW 100 Bloco F</TableCell>
      <TableCell className="font-medium">R$ 149,90</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">A retirar</span>
        </div>
      </TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Retirado
        </Button>
      </TableCell>
    </TableRow>
  )
}
