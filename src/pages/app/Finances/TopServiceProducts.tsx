// interface Props { }

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
            <TableRow>
              <TableCell className="font-medium">
                Carrinho tradicional
              </TableCell>
              <TableCell className="text-right">100</TableCell>
              <TableCell className="text-right">R$ 80,00</TableCell>
              <TableCell className="text-right">R$ 8000,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Bebê conforto</TableCell>
              <TableCell className="text-right">94</TableCell>
              <TableCell className="text-right">R$ 40,00</TableCell>
              <TableCell className="text-right">R$ 3760,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Carrinho tradicional
              </TableCell>
              <TableCell className="text-right">100</TableCell>
              <TableCell className="text-right">R$ 80,00</TableCell>
              <TableCell className="text-right">R$ 8000,00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
