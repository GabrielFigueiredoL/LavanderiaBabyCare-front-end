import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TopServiceProductsTableRow } from './TopServiceProductsTableRow'

export function TopServiceProducts() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Mais vendidos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
              <TableHead className="text-right">Valor unitário</TableHead>
              <TableHead className="text-right">Lucro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TopServiceProductsTableRow />
            <TopServiceProductsTableRow />
            <TopServiceProductsTableRow />
            <TopServiceProductsTableRow />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
