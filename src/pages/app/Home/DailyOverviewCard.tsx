import { districtAmountPerDay } from '@/api/orderRequests/getDistrictAmountPerDay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DailyOverviewTableRow } from './DailyOverviewTableRow'
import { DailyOverviewTableRowSkeleton } from './DailyOverviewTableRowSkeleton'

interface CardProps {
  isTitleWithdrawal?: boolean
  data: districtAmountPerDay[]
  isLoading: boolean
}

export function DailyOverviewCard({
  isTitleWithdrawal,
  data,
  isLoading,
}: CardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isTitleWithdrawal ? 'Retiradas' : 'Entregas'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Local</TableHead>
              <TableHead className="w-10">Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          {!isLoading ? (
            <TableBody>
              {data.map((item) => (
                <DailyOverviewTableRow
                  key={item.district}
                  name={item.district}
                  amount={item.amount}
                />
              ))}
            </TableBody>
          ) : (
            <DailyOverviewTableRowSkeleton />
          )}
        </Table>
      </CardContent>
    </Card>
  )
}
