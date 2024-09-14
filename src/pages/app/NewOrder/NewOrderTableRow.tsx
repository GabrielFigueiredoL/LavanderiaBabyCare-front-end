import { X } from 'lucide-react'

import { selectedProduct } from '@/api/productRequests/product'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

interface RowProps {
  selectedItem: selectedProduct
  removeFunction: (selectedItem: selectedProduct) => void
}

export function NewOrderTableRow({ selectedItem, removeFunction }: RowProps) {
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
      <TableCell>{selectedItem.product.name}</TableCell>
      <TableCell className="text-right">
        {(selectedItem.product.price / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="text-right">{selectedItem.amount}</TableCell>
      <TableCell className="text-right">
        {(
          (selectedItem.product.price / 100) *
          selectedItem.amount
        ).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
    </TableRow>
  )
}
