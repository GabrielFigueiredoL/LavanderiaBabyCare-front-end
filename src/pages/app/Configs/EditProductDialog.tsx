import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { deleteProduct } from '@/api/productRequests/deleteProduct'
import { productProps } from '@/api/productRequests/product'
import { putUpdateProduct } from '@/api/productRequests/putUpdateProduct'
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

interface props {
  product: productProps
  open: boolean
  onOpenChange: (open: boolean) => void
}

const editProductSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  updated_at: z.date(),
})

export function EditProductDialog({ product, open, onOpenChange }: props) {
  const form = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product?.name ?? '',
      price: product?.price / 100,
      updated_at: new Date(),
    },
  })

  const queryClient = useQueryClient()

  const { mutateAsync: updateService } = useMutation({
    mutationFn: putUpdateProduct,
    onSuccess(_, { id, name, price, updatedAt }) {
      const cached = queryClient.getQueryData<productProps[]>(['products'])
      if (cached) {
        const updatedData = cached.map((item) => {
          if (item.id === id) {
            return { ...item, name, price, updatedAt }
          }
          return item
        })

        queryClient.setQueryData(['products'], updatedData)
      }
    },
  })

  const { mutateAsync: deleteProductFn } = useMutation({
    mutationFn: deleteProduct,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData<productProps[]>(['products'])
      if (cached) {
        queryClient.setQueryData(
          ['products'],
          cached.filter((product) => product.id !== variables),
        )
      }
    },
  })

  async function handleOnSubmit(values: z.infer<typeof editProductSchema>) {
    const editedService = {
      ...product,
      name: values.name.toLowerCase(),
      price: values.price * 100,
      updated_at: values.updated_at,
    }

    try {
      await updateService(editedService)
      toast.success('Serviço editado com sucesso.')
    } catch {
      toast.error('Não foi possivel editar o serviço.')
    }
  }

  async function handleOnDelete() {
    try {
      await deleteProductFn(product.id)
      onOpenChange(!open)
      toast.success('Serviço excluído com sucesso.')
    } catch {
      toast.error('Não foi possivel excluir o serviço.')
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar produto</DialogTitle>
        <DialogDescription>Edite as informações do serviço</DialogDescription>
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

          <DialogFooter className="gap-3">
            <Button
              variant="ghost"
              type="button"
              onClick={() => onOpenChange(!open)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              type="button"
              onClick={handleOnDelete}
            >
              Excluir
            </Button>
            <Button variant="accept" type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
