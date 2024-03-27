// interface Props { }

import { TableCell, TableRow } from '@/components/ui/table'

export interface TableRowProps {
  name: string
  amount: number
}

export function DailyOverviewTableRow({ name, amount }: TableRowProps) {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell className="text-right">{amount}</TableCell>
    </TableRow>
  )
}
