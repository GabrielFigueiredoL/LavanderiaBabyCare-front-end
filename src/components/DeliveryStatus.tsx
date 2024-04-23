type DeliveryStatus =
  | 'toBeWithdrawn'
  | 'withdrawn'
  | 'processing'
  | 'toBeDelivery'
  | 'delivered'
  | 'toBePaid'
  | 'paid'

interface DeliveryStatusProps {
  status: DeliveryStatus
}

const deliveryStatusMap: Record<DeliveryStatus, string> = {
  toBeWithdrawn: 'A retirar',
  withdrawn: 'Retirado',
  processing: 'Em limpeza',
  toBeDelivery: 'A ser entregue',
  delivered: 'Entregue',
  toBePaid: 'A ser pago',
  paid: 'Pago',
}

export function DeliveryStatus({ status }: DeliveryStatusProps) {
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
