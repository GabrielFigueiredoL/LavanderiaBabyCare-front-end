import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { getServices } from '@/api/getServices'
import { postNewService } from '@/api/postNewService'
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

const newServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  updated_at: z.date(),
})

export function NewServiceDialog() {
  const form = useForm<z.infer<typeof newServiceSchema>>({
    resolver: zodResolver(newServiceSchema),
    defaultValues: {
      id: uuid(),
      name: '',
      price: 0,
      updated_at: new Date(),
    },
  })

  const { mutateAsync: addNewService } = useMutation({
    mutationFn: postNewService,
  })

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })

  async function handleOnSubmit(values: z.infer<typeof newServiceSchema>) {
    const newService = {
      ...values,
      name: values.name.toLowerCase(),
      price: values.price * 100,
    }

    const isUniqueService = services?.find(
      (item) => item.name === newService.name,
    )

    try {
      if (!isUniqueService) {
        await addNewService({ ...newService })
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
            <Button variant="ghost">Cancelar</Button>
            <Button variant="accept" type="submit">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
