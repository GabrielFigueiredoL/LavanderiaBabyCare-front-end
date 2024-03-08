// interface Props { }

import { ClientsPerMonth } from './ClientsPerMonthChart'
import { MonthExpensesCard } from './MonthExpensesCard'
import { MonthOverviewChart } from './MonthOverviewChart'
import { MonthProfitCard } from './MonthProfitCard'
import { MonthRevenuesCard } from './MonthRevenuesCard'
import { MonthServicesCard } from './MonthServicesCard'
import { RevenueChart } from './RevenueChart'
import { TopServiceProducts } from './TopServiceProducts'

export function Finances() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
      <div className="grid grid-cols-4 gap-4">
        <MonthServicesCard />
        <MonthRevenuesCard />
        <MonthExpensesCard />
        <MonthProfitCard />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <RevenueChart />
        <MonthOverviewChart />
        <TopServiceProducts />
        <ClientsPerMonth />
      </div>
    </div>
  )
}
