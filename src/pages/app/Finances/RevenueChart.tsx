// interface Props { }

import {
  CartesianGrid,
  Line,
  LineChart,
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  {
    date: 'jan',
    revenue: 2711,
  },
  {
    date: 'fev',
    revenue: 1204,
  },
  {
    date: 'mar',
    revenue: 2952,
  },
  {
    date: 'abr',
    revenue: 1875,
  },
  {
    date: 'mai',
    revenue: 1263,
  },
  {
    date: 'jun',
    revenue: 2159,
  },
  {
    date: 'jul',
    revenue: 1200,
  },
]

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload?.[0].value?.toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          },
        )}`}</p>
      </div>
    )
  }

  return null
}

export function RevenueChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Lucro Mensal</CardTitle>
        <CardDescription>Lucro total dos últimos meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={90}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <XAxis dataKey="date" dy={10} axisLine={false} tickLine={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
