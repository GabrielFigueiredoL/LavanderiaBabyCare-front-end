import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function TopServiceProductsTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-5 w-36" />
      </TableCell>
      <TableCell>
        <Skeleton className="ml-auto h-5 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="ml-auto h-5 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="ml-auto h-5 w-28" />
      </TableCell>
    </TableRow>
  )
}
