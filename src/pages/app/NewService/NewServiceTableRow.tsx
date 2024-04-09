import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { ServicePropsType } from './NewServiceCombobox'

interface RowProps {
  selectedService: ServicePropsType
  amount: number
}

export function NewServiceTableRow({ selectedService, amount }: RowProps) {
  return (
    <TableRow>
      <TableCell className="text-right">
        <Button variant="ghost" size="xs">
          <X className="h-5 w-5" color="#be123c" />
        </Button>
      </TableCell>
      <TableCell>{selectedService.name}</TableCell>
      <TableCell className="text-right">
        {selectedService.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="text-right">{amount}</TableCell>
      <TableCell className="text-right">
        {(selectedService.price * amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
    </TableRow>
  )
}
