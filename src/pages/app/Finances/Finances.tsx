// interface Props { }

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { ClientsPerMonth } from './ClientsPerMonthChart'
import { MonthExpensesCard } from './MonthExpensesCard'
import { MonthOverviewChart } from './MonthOverviewChart'
import { MonthProfitCard } from './MonthProfitCard'
import { MonthRevenuesCard } from './MonthRevenuesCard'
import { MonthServicesCard } from './MonthServicesCard'
import { NewExpenseDialog } from './NewExpenseDialog'
import { RevenueChart } from './RevenueChart'
import { TopServiceProducts } from './TopServiceProducts'

export function Finances() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="md:hidden" />
              <span className="hidden md:block">Adicionar despesa</span>
            </Button>
          </DialogTrigger>
          <NewExpenseDialog />
        </Dialog>
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
        <MonthServicesCard />
        <MonthRevenuesCard />
        <MonthExpensesCard />
        <MonthProfitCard />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <RevenueChart />
        <MonthOverviewChart />
        <TopServiceProducts />
        <ClientsPerMonth />
      </div>
    </div>
  )
}
