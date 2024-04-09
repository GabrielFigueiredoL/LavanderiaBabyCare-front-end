import { format } from 'date-fns'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { z } from 'zod'

import BabycareLogo from '@/assets/babycare.png'
import { useTheme } from '@/components/theme/ThemeProvider'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { newServiceFormValidationSchema } from '../NewService'

type DataProps = z.infer<typeof newServiceFormValidationSchema>

function transformToMoney(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function PDFTemplate() {
  const location = useLocation()
  const { setTheme } = useTheme()
  setTheme('light')

  const data: DataProps = location.state.data

  const initialItemsPrice = 0
  const finalItemsPrice = data.selectedItems.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.service.price * currentItem.amount,
    initialItemsPrice,
  )

  const contentToPrint = useRef(null)
  const handlePrint = useReactToPrint({
    documentTitle: `${data.name} - ${data.deliveryDate}`,
  })

  return (
    <div className="flex flex-col">
      <div
        style={{ WebkitPrintColorAdjust: 'exact' }}
        className="align-center flex min-h-screen flex-col px-6 antialiased"
        ref={contentToPrint}
      >
        <header className="mt-10 grid grid-cols-4 gap-3">
          <img src={BabycareLogo} alt="" className="self-end" />
          <div className="col-span-3">
            <h1 className="text-xl font-bold tracking-tight">
              Baby Care lavanderia Infantil
            </h1>
            <div className="flex gap-4 text-sm font-normal">
              <div className="">
                <p>CNPJ: 39.817.493.0001-92</p>
                <p>QNE 19 Lote 18</p>
                <p>Taguatinga, Comercial Norte</p>
                <p>Cep: 72125-190</p>
              </div>
              <div>
                <div className="flex items-center gap-[5px]">
                  <Mail className="h-4" />
                  <p>babycarelavanderiainfantil@gmail.com</p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <Phone className="h-4" />
                  <p>(61) 98310-4317</p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <Instagram className="h-4" />
                  <p>@babycare_lavanderiainfantil</p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <Facebook className="h-4" />
                  <p>babycarelavanderiainfantil</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="mt-6 flex flex-1 flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <p>
              <span className="font-bold">Data de retirada:</span>{' '}
              {format(data.withdrawalDate, 'dd/MM/yyyy')}
            </p>
            <p>
              <span className="font-bold">Data de entrega:</span>{' '}
              {format(data.deliveryDate, 'dd/MM/yyyy')}
            </p>
          </div>

          <h2 className="bg-slate-300 text-lg font-bold tracking-tight">
            Cliente
          </h2>
          <div className="grid grid-cols-2">
            <p>
              <span className="font-bold">Nome:</span> {data.name}
            </p>
            <p className="justify-self-end">
              <span className="font-bold">Celular:</span> {data.phone}
            </p>
            <p>
              <span className="font-bold">Endereço:</span>{' '}
              {`${data.adress} ${data.complement}, ${data.number}. ${data.district}`}
            </p>
            {data.cep && (
              <p className="justify-self-end">
                {' '}
                <span className="font-bold">Cep:</span>
                {data.cep}
              </p>
            )}
          </div>
          <h2 className="bg-slate-300 text-lg font-bold tracking-tight">
            Serviços
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Preço Unitário</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.selectedItems.map((item) => (
                <TableRow key={item.service.name}>
                  <TableCell>{item.service.name}</TableCell>
                  <TableCell className="text-right">
                    {transformToMoney(item.service.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {transformToMoney(item.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    {transformToMoney(item.service.price * item.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="py-2" colSpan={3}>
                  Valor Total
                </TableCell>
                <TableCell className="py-2 text-right">
                  {transformToMoney(finalItemsPrice)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-2" colSpan={3}>
                  Frete
                </TableCell>
                <TableCell className="py-2 text-right">
                  {transformToMoney(data.freightage)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-2" colSpan={3}>
                  Descontos
                </TableCell>
                <TableCell className="py-2 text-right">
                  - {transformToMoney(data.discount)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-2" colSpan={3}>
                  Valor Final
                </TableCell>
                <TableCell className="py-2 text-right">
                  {transformToMoney(finalItemsPrice)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <h2 className="bg-slate-300 text-lg font-bold tracking-tight">
            Pagamento
          </h2>
          <div className="flex justify-between">
            <div>
              <p className="font-bold ">Meios de pagamento</p>

              <p>Dinheiro, cartão ou pix</p>
            </div>
            <div>
              <p className="justify-self-center font-bold">PIX</p>
              <p className="justify-self-end">61983104317</p>
            </div>
          </div>
        </div>
      </div>
      <Button
        className="mt-5 place-self-center"
        onClick={() => {
          handlePrint(null, () => contentToPrint.current)
        }}
      >
        Imprimir
      </Button>
    </div>
  )
}
