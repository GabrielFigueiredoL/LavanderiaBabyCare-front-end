import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function DailyOverviewTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-5 w-36" />
      </TableCell>
      <TableCell>
        <Skeleton className="ml-auto h-5 w-10" />
      </TableCell>
    </TableRow>
  )
}
