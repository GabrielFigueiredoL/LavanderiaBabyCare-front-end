import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import { deleteOrder } from '@/api/orderRequests/deleteOrder'
import { getOrderDetails } from '@/api/orderRequests/getOrderDetails'
import { OrderDetailsPropsResponse } from '@/api/orderRequests/order'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderDetailsSkeleton } from './OrderDetailsSkeleton'
import { OrderStatus } from './OrderStatus'
import { Button } from './ui/button'

interface props {
  orderId: string
  open: boolean
}

function transformToMoney(value: number) {
  return (value / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function transformToPhoneNumber(phoneNumber: string) {
  const match = phoneNumber.match(/^(\d{2})(\d{4}|\d{5})(\d{4})$/)
  if (match) {
    return ['(', match[1], ') ', match[2], '-', match[3]].join('')
  }
}

export function OrderDetails({ orderId, open }: props) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  })

  const { mutateAsync: deleteOrderFn } = useMutation({
    mutationFn: deleteOrder,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData<OrderDetailsPropsResponse[]>([
        'orders',
      ])
      if (cached) {
        queryClient.setQueryData(
          ['orders'],
          cached.filter((order) => order.id !== variables),
        )
      }
    },
  })

  function handlePrint() {
    navigate('/toPrint', { state: { data: order } })
  }

  async function handleOnDelete() {
    await deleteOrderFn(order!.id)
  }

  return (
    <>
      {order ? (
        <DialogContent className="max-h-[90%] overflow-y-scroll p-2 md:p-6">
          <DialogHeader>
            <DialogTitle>Entrega: {order?.id}</DialogTitle>
            <DialogDescription>Detalhes da entrega</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <Table className="text-xs md:text-sm">
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Status
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {<OrderStatus status={order.status.name} />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Cliente
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {order.clientName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {transformToPhoneNumber(order.clientPhone)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Data de retirada
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {format(
                      parse(
                        order?.pickupDate as unknown as string,
                        'yyyy-MM-dd',
                        new Date(),
                      ),
                      'dd/MM/yyyy',
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Data de entrega
                  </TableCell>
                  <TableCell className="flex justify-end">
                    {format(
                      parse(
                        order?.deliveryDate as unknown as string,
                        'yyyy-MM-dd',
                        new Date(),
                      ),
                      'dd/MM/yyyy',
                    )}
                  </TableCell>
                </TableRow>
                {order.cep && (
                  <TableRow>
                    <TableCell className="text-muted-foreground">Cep</TableCell>
                    <TableCell className="flex justify-end">
                      {order.cep.slice(0, 5) + '-' + order.cep.slice(5)}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Bairro
                  </TableCell>
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

            <Table className="text-xs md:text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Valor unitário</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.selectedItems.map((item) => (
                  <TableRow key={item.product.name}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {transformToMoney(item.price)}
                    </TableCell>
                    <TableCell className="text-right">{item.amount}</TableCell>
                    <TableCell className="text-right">
                      {transformToMoney(item.price * item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Desconto</TableCell>
                  <TableCell colSpan={2} className="text-right">
                    - {transformToMoney(order.discount)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Frete</TableCell>
                  <TableCell colSpan={2} className="text-right">
                    + {transformToMoney(order.shipping)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Valor total</TableCell>
                  <TableCell colSpan={2} className="text-right">
                    {transformToMoney(order.total)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>

            <div className="flex justify-between">
              <Button
                className="w-2/5"
                variant="destructive"
                onClick={handleOnDelete}
              >
                Excluir
              </Button>
              <Button className="w-2/5" onClick={handlePrint}>
                Orçamento
              </Button>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="max-h-[90%] overflow-y-scroll p-2 md:p-6">
          <OrderDetailsSkeleton />
        </DialogContent>
      )}
    </>
  )
}
