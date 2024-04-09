// interface Props { }

import { Loader2 } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  {
    name: 'gasolina',
    value: 1000,
    type: 'expense',
  },
  {
    name: 'entregas',
    value: 7900,
    type: 'revenue',
  },
  {
    name: 'conserto',
    value: 1200,
    type: 'expense',
  },
  {
    name: 'produtos',
    value: 2145,
    type: 'expense',
  },
]

export function MonthOverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo do mês</CardTitle>
      </CardHeader>

      <CardContent>
        {true ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontsize: 12 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {data[index].name.length > 12
                        ? data[index].name.substring(0, 12).concat('...')
                        : data[index].name}{' '}
                      (
                      {value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                      )
                    </text>
                  )
                }}
              >
                {data.map((data, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        data.type === 'revenue'
                          ? colors.emerald[500]
                          : colors.rose[500]
                      }
                      className="stroke-background"
                    />
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
