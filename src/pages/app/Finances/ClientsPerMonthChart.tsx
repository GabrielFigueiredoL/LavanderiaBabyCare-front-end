// interface Props { }

import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  {
    month: 'jan',
    amount: 2000,
  },
  {
    month: 'fev',
    amount: 3592,
  },

  {
    month: 'mar',
    amount: 2943,
  },
  {
    month: 'abr',
    amount: 2000,
  },
  {
    month: 'mai',
    amount: 2492,
  },
  {
    month: 'jun',
    amount: 3375,
  },
  {
    month: 'jul',
    amount: 2176,
  },
]

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="rounded border border-violet-800 bg-background p-2">
        <p className="label">{`${label} : ${payload?.[0].value}`}</p>
      </div>
    )
  }

  return null
}

export function ClientsPerMonth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes por mês</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} barCategoryGap="40%">
            <XAxis dataKey="month" />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Bar
              dataKey="amount"
              fill="#8884d8"
              radius={[360, 360, 360, 360]}
              activeBar={<Rectangle fill="#413bb2" />}
            />
            <YAxis stroke="#888" axisLine={false} tickLine={false} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
