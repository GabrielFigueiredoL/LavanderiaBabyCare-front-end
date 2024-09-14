export type OrderStatus =
  | 'toBeWithdrawn'
  | 'withdrawn'
  | 'processing'
  | 'toBeDelivery'
  | 'delivered'
  | 'toBePaid'
  | 'paid'

interface OrderStatusProps {
  status: OrderStatus
}

export const deliveryStatusMap: Record<OrderStatus, string> = {
  toBeWithdrawn: 'A retirar',
  withdrawn: 'Retirado',
  processing: 'Em limpeza',
  toBeDelivery: 'A ser entregue',
  delivered: 'Entregue',
  toBePaid: 'A ser pago',
  paid: 'Pago',
}

const keys = Object.keys(deliveryStatusMap) as Array<string>

export function getNextOrderStatus(statusId: number) {
  const newStatusId = statusId + 1
  const status = {
    id: newStatusId,
    name: keys[newStatusId] as OrderStatus,
  }

  return status
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'toBeWithdrawn' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === 'paid' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      {status === 'delivered' && (
        <span className="h-2 w-2 rounded-full bg-lime-500" />
      )}

      {['processing', 'toBeDelivery', 'withdrawn', 'toBePaid'].includes(
        status,
      ) && <span className="h-2 w-2 rounded-full bg-amber-500" />}
      <span className="font-medium text-muted-foreground">
        {deliveryStatusMap[status]}
      </span>
    </div>
  )
}
