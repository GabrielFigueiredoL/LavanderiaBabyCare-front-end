// interface Props { }

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DailyOverviewTableRow } from './DailyOverviewTableRow'

interface CardProps {
  isTitleWithdrawal?: boolean
  data: {
    name: string
    amount: number
  }[]
}

export function DailyOverviewCard({ isTitleWithdrawal, data }: CardProps) {
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
          <TableBody>
            {data.map((item) => (
              <DailyOverviewTableRow
                key={item.name}
                name={item.name}
                amount={item.amount}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
