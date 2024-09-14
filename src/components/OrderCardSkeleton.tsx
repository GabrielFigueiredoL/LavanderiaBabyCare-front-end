import { ArrowRight, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { Skeleton } from './ui/skeleton'

export function OrderCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex justify-between">
          <Button variant="outline" size="xs" disabled>
            <Search className="mr-2 h-3 w-3" />
            <span>Mais detalhes</span>
          </Button>
          <Button variant="outline" size="xs" disabled>
            <ArrowRight className="mr-2 h-3 w-3" />
            <Skeleton className="h-5 w-14" />
          </Button>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-32" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-32" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Bairro</TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-32" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Logradouro
              </TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-48" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Complemento
              </TableCell>
              <TableCell className="flex justify-end">
                <Skeleton className="h-5 w-32" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
