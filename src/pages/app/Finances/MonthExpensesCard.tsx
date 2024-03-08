// interface Props { }

import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthExpensesCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Despesas Totais (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">- R$ 4345,00</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-rose-700 dark:text-rose-400">+3%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
