import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { postNewDelivery } from '@/api/postNewDelivery'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { InputField } from '../../../components/InputField'
import { DatePicker } from './DatePicker'
import { newDeliveryFormValidationSchema } from './FormSchema'
import {
  NewDeliveryCombobox,
  ServiceProps,
  ServicePropsType,
} from './NewDeliveryCombobox'
import { NewDeliveryTableRow } from './NewDeliveryTableRow'

const NewItem = z.object({
  service: ServiceProps,
  amount: z.number(),
})

export type NewItem = z.infer<typeof NewItem>

export function NewDelivery() {
  const [selectedService, setSelectedService] = useState<ServicePropsType>({
    name: '',
    price: 0,
  })
  const [amount, setAmount] = useState<number>(1)
  const [selectedItems, setSelectedItems] = useState<NewItem[]>([])

  const form = useForm<z.infer<typeof newDeliveryFormValidationSchema>>({
    resolver: zodResolver(newDeliveryFormValidationSchema),
    defaultValues: {
      name: '',
      phone: '',
      withdrawalDate: new Date(),
      deliveryDate: new Date(),
      cep: '',
      adress: '',
      district: '',
      number: '',
      complement: '',
      freightage: 0,
      discount: 0,
      id: uuid(),
    },
  })

  const initialItemsPrice = 0
  const finalItemsPrice = selectedItems.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.service.price * currentItem.amount,
    initialItemsPrice,
  )
  const freightage = Number(form.watch('freightage'))
  const discount = Number(form.watch('discount'))
  const cep = form.watch('cep')

  const { mutateAsync: addNewService } = useMutation({
    mutationFn: postNewDelivery,
  })

  async function HandleOnSubmit(
    values: z.infer<typeof newDeliveryFormValidationSchema>,
  ) {
    try {
      await addNewService({ ...values, status: 'toBeWithdrawn', selectedItems })
      toast.success('Entrega adicionada com sucesso.')
    } catch {
      toast.error('Não foi possivel adicionar uma nova entrega.')
    }
  }

  async function handleCepSubmit() {
    const cepData = await fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error)
        toast.error('Falha ao buscar cep, verifique e tente novamente')
      })

    const isCepInvalid = cepData.erro

    if (isCepInvalid) {
      toast.error('Falha ao buscar cep, verifique o número e tente novamente')
    }

    form.setValue('adress', cepData.logradouro)
    form.setValue('district', cepData.bairro)
  }

  function handleAddService() {
    const isAlreadySelected = selectedItems.find(
      (item) => item.service === selectedService,
    )

    const serviceIsValid = selectedService.name.length

    if (isAlreadySelected) {
      toast.error('Item já adicionado')
    } else if (!serviceIsValid) {
      toast.error('É necessário escolher um item')
    } else {
      setSelectedItems((prevState) => [
        ...prevState,
        { service: selectedService, amount },
      ])
    }
  }

  function handleRemoveService(selectedItem: NewItem) {
    const filteredList = selectedItems.filter((item) => item !== selectedItem)
    setSelectedItems(filteredList)
  }

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Novo serviço</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(HandleOnSubmit)}
          className="flex flex-col"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <InputField id="name" label="Nome do cliente" field={field} />
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <InputField id="phone" label="Telefone" field={field} />
                )}
              />

              <FormField
                control={form.control}
                name="withdrawalDate"
                render={({ field }) => (
                  <DatePicker label="Data de retirada" field={field} />
                )}
              />

              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <DatePicker label="Data de entrega" field={field} />
                )}
              />

              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <div className="flex gap-3">
                    <InputField id="cep" label="Cep" field={field} />
                    <Button
                      variant="outline"
                      className="self-end"
                      onClick={() => handleCepSubmit()}
                      type="button"
                    >
                      <Search />
                    </Button>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="adress"
                render={({ field }) => (
                  <InputField id="adress" label="Logradouro" field={field} />
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <InputField id="district" label="Bairro" field={field} />
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <InputField id="number" label="Número" field={field} />
                )}
              />

              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <InputField
                    id="complement"
                    label="Complemento"
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="freightage"
                render={({ field }) => (
                  <InputField
                    id="freightage"
                    label="Frete"
                    type="number"
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <InputField
                    id="discount"
                    label="Desconto"
                    type="number"
                    field={field}
                  />
                )}
              />

              <div>
                <Label>Selecione um serviço</Label>
                <div className="flex gap-2">
                  <NewDeliveryCombobox
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                  />
                  <Input
                    type="number"
                    className="w-20"
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleAddService}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-7 text-right"></TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead className="w-28 text-right">Valor</TableHead>
                    <TableHead className="w-7 text-right">Qtd</TableHead>
                    <TableHead className="w-28 text-right">
                      Valor Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedItems.map((item) => (
                    <NewDeliveryTableRow
                      selectedItem={item}
                      key={item.service.name}
                      removeFunction={handleRemoveService}
                    />
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-medium" colSpan={3}>
                      Sub-total
                    </TableCell>
                    <TableCell className="text-right" colSpan={2}>
                      {finalItemsPrice.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium" colSpan={3}>
                      Frete
                    </TableCell>
                    <TableCell className="text-right" colSpan={2}>
                      {freightage.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium" colSpan={3}>
                      Desconto
                    </TableCell>
                    <TableCell className="text-right" colSpan={2}>
                      -{' '}
                      {discount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium" colSpan={3}>
                      Total
                    </TableCell>
                    <TableCell className="text-right" colSpan={2}>
                      {(finalItemsPrice + freightage - discount).toLocaleString(
                        'pt-BR',
                        {
                          style: 'currency',
                          currency: 'BRL',
                        },
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
          <Button type="submit" className="ml-auto mt-2">
            Adicionar
          </Button>
        </form>
      </Form>
    </>
  )
}
