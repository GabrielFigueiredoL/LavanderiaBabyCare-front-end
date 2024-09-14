import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getProducts } from '@/api/productRequests/getProducts'
import { postNewProduct } from '@/api/productRequests/postNewProduct'
import { productProps } from '@/api/productRequests/product'
import { InputField } from '@/components/InputField'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormField } from '@/components/ui/form'

const newProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Preencha o nome do serviço.'),
  price: z.coerce.number().min(1, 'Preencha o valor do serviço.'),
  updatedAt: z.date(),
})

interface ProductDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function NewProductDialog({ open, setOpen }: ProductDialogProps) {
  const form = useForm<z.infer<typeof newProductSchema>>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      id: '',
      name: '',
      price: 0,
      updatedAt: new Date(),
    },
  })

  const queryClient = useQueryClient()

  const { mutateAsync: addNewProduct } = useMutation({
    mutationFn: postNewProduct,
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })
      const previousData = queryClient.getQueryData(['products'])
      queryClient.setQueryData(['products'], (oldData: productProps[]) => [
        ...oldData,
        newProduct,
      ])

      return { previousData }
    },

    onError: (error, _, context) => {
      console.log(error)
      queryClient.setQueryData(['products'], context?.previousData)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  async function handleOnSubmit(values: z.infer<typeof newProductSchema>) {
    const newProduct = {
      ...values,
      name: values.name.toLowerCase(),
      price: values.price * 100,
    }

    const isProductAlreadyAdded = products?.find(
      (item) => item.name === newProduct.name,
    )

    try {
      if (!isProductAlreadyAdded) {
        await addNewProduct({ ...newProduct })
        toast.success('Serviço adicionado com sucesso.')
      } else {
        toast.error('Serviço já adicionado anteriormente.')
      }
    } catch {
      toast.error('Não foi possivel adicionar um novo serviço.')
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar novo produto</DialogTitle>
        <DialogDescription>
          Adicione as informações do novo serviço
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <div className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <InputField id="name" label="Nome do serviço" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <InputField
                  id="price"
                  label="Preço"
                  field={field}
                  type="number"
                />
              )}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setOpen(!open)}
            >
              Cancelar
            </Button>
            <Button variant="accept" type="submit">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
