import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { ArrowRight, Search } from 'lucide-react'

import { DeliveryPropsResponse } from '@/api/getDeliveries'
import { ServiceDetails } from '@/components/ServiceDetails'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { DeliveryStatus } from './DeliveryStatus'

interface DeliveryCardProps {
  delivery: DeliveryPropsResponse
}

export function DeliveryCard({ delivery }: DeliveryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="mr-2 h-3 w-3" />
                <span>Mais detalhes</span>
              </Button>
            </DialogTrigger>

            <ServiceDetails />
          </Dialog>
          <Button variant="outline" size="xs">
            <ArrowRight className="mr-2 h-3 w-3" />
            Retirado
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
                {<DeliveryStatus status={delivery.status} />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                {delivery?.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Bairro</TableCell>
              <TableCell className="flex justify-end">
                {delivery.district}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Logradouro
              </TableCell>
              <TableCell className="flex justify-end">
                {delivery.adress}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Complemento
              </TableCell>
              <TableCell className="flex justify-end">
                {`${delivery.complement} ${delivery.number}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
