import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'

import { OrderDetailsPropsResponse } from '@/api/orderRequests/order'
import { putUpdateOrder } from '@/api/orderRequests/putUpdateOrder'
import { OrderDetails } from '@/components/OrderDetails'
import {
  deliveryStatusMap,
  getNextOrderStatus,
  OrderStatus,
} from '@/components/OrderStatus'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function OrderCard(order: OrderDetailsPropsResponse) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutateAsync: updateOrder } = useMutation({
    mutationFn: putUpdateOrder,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData<OrderDetailsPropsResponse[]>([
        'orders',
      ])
      if (cached) {
        const updatedData = cached.map((item) => {
          if (item.id === variables.id) {
            return variables
          }
          return item
        })

        queryClient.setQueryData(['orders'], updatedData)
      }
    },
  })

  function updateStatus(statusId: number) {
    const updatedOrder = {
      ...order,
      status: getNextOrderStatus(statusId),
    }
    updateOrder(updatedOrder)
  }
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex justify-between">
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="mr-2 h-3 w-3" />
                <span>Mais detalhes</span>
              </Button>
            </DialogTrigger>

            <OrderDetails orderId={order.id} open={isDetailsOpen} />
          </Dialog>
          {order.status.id !== 6 && (
            <Button
              variant="outline"
              size="xs"
              onClick={() => updateStatus(order.status.id)}
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              {deliveryStatusMap[getNextOrderStatus(order.status.id).name]}
            </Button>
          )}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                {<OrderStatus status={order.status.name} />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                {order?.clientName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Bairro</TableCell>
              <TableCell className="flex justify-end">
                {order.district}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Logradouro
              </TableCell>
              <TableCell className="flex justify-end">
                {order.address}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Complemento
              </TableCell>
              <TableCell className="flex justify-end">
                {`${order.complement} ${order.number}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
