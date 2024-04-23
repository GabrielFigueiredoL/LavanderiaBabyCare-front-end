import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { NewItem } from './NewDelivery'

interface RowProps {
  selectedItem: NewItem
  removeFunction: (selectedItem: NewItem) => void
}

export function NewDeliveryTableRow({
  selectedItem,
  removeFunction,
}: RowProps) {
  return (
    <TableRow>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="xs"
          type="button"
          onClick={() => removeFunction(selectedItem)}
        >
          <X className="h-5 w-5" color="#be123c" />
        </Button>
      </TableCell>
      <TableCell>{selectedItem.service.name}</TableCell>
      <TableCell className="text-right">
        {selectedItem.service.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="text-right">{selectedItem.amount}</TableCell>
      <TableCell className="text-right">
        {(selectedItem.service.price * selectedItem.amount).toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          },
        )}
      </TableCell>
    </TableRow>
  )
}
