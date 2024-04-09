import { Skeleton } from '@/components/ui/skeleton'

export function MetricCardSkeleton() {
  return (
    <div className="w-auto">
      <Skeleton className="mb-1 mt-1 h-7 w-2/4" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
