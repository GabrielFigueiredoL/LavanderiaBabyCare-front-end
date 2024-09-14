import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { OrderDetailsProps } from '@/api/orderRequests/order'
import { postNewOrder } from '@/api/orderRequests/postNewOrder'
import { productProps, selectedProduct } from '@/api/productRequests/product'
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
import { NewOrderCombobox } from './NewOrderCombobox'
import { NewOrderTableRow } from './NewOrderTableRow'

export function NewOrder() {
  const [selectedProduct, setSelectedProduct] = useState<productProps>({
    id: '',
    price: 0,
    name: '',
    updatedAt: new Date(0),
  })
  const [amount, setAmount] = useState<number>(1)
  const [selectedItems, setSelectedItems] = useState<selectedProduct[]>([])

  const form = useForm<z.infer<typeof newDeliveryFormValidationSchema>>({
    resolver: zodResolver(newDeliveryFormValidationSchema),
    defaultValues: {
      clientName: '',
      clientPhone: '',
      pickupDate: new Date(),
      deliveryDate: new Date(),
      cep: '',
      address: '',
      district: '',
      number: '',
      complement: '',
      shipping: 0,
      discount: 0,
      id: '',
    },
  })

  const initialItemsPrice = 0
  const finalItemsPrice = selectedItems.reduce(
    (accumulator, currentItem) =>
      accumulator + (currentItem.product.price / 100) * currentItem.amount,
    initialItemsPrice,
  )
  const shipping = Number(form.watch('shipping'))
  const discount = Number(form.watch('discount'))
  const cep = form.watch('cep')

  const { mutateAsync: addNewOrder } = useMutation({
    mutationFn: postNewOrder,
  })

  async function HandleOnSubmit(
    values: z.infer<typeof newDeliveryFormValidationSchema>,
  ) {
    if (selectedItems.length < 1) {
      toast.error('Selecione pelo menos 1 item')
    } else {
      try {
        const newOrder: OrderDetailsProps = {
          ...values,
          status: {
            id: 0,
            name: 'toBeWithdrawn',
          },
          selectedItems,
          shipping: values.shipping * 100,
          discount: values.discount * 100,
        }

        await addNewOrder({ ...newOrder })
        form.reset()
        setSelectedItems([])
        toast.success('Entrega adicionada com sucesso.')
      } catch {
        toast.error('Não foi possivel adicionar uma nova entrega.')
      }
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

    form.setValue('address', cepData.logradouro)
    form.setValue('district', cepData.bairro)
  }

  function handleAddService() {
    const isAlreadySelected = selectedItems.find(
      (item) => item.product === selectedProduct,
    )

    const productIsValid = selectedProduct?.name.length

    if (isAlreadySelected) {
      toast.error('Item já adicionado')
    } else if (!productIsValid) {
      toast.error('É necessário escolher um item')
    } else {
      setSelectedItems((prevState) => [
        ...prevState,
        {
          product: selectedProduct,
          amount,
          price: selectedProduct.price,
        },
      ])
    }
  }

  function handleRemoveService(selectedItem: selectedProduct) {
    const filteredList = selectedItems.filter(
      (product) => product !== selectedItem,
    )
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
                name="clientName"
                render={({ field }) => (
                  <InputField
                    id="clientName"
                    label="Nome do cliente"
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="clientPhone"
                render={({ field }) => (
                  <InputField id="field" label="Telefone" field={field} />
                )}
              />

              <FormField
                control={form.control}
                name="pickupDate"
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
                name="address"
                render={({ field }) => (
                  <InputField id="address" label="Logradouro" field={field} />
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
                name="shipping"
                render={({ field }) => (
                  <InputField
                    id="shipping"
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
                  <NewOrderCombobox
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
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
                    <NewOrderTableRow
                      selectedItem={item}
                      key={item.product.name}
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
                      {shipping.toLocaleString('pt-BR', {
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
                      {(finalItemsPrice + shipping - discount).toLocaleString(
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
