import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ServicePropsResponse } from '@/api/getServices'
import { putUpdateService } from '@/api/putUpdateService'
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

interface ServiceProps {
  service: ServicePropsResponse
}

const editServiceSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  updated_at: z.date(),
})

export function EditServiceDialog({ service }: ServiceProps) {
  const form = useForm<z.infer<typeof editServiceSchema>>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      name: service?.name ?? '',
      price: service?.price / 100 ?? 0,
      updated_at: new Date(),
    },
  })

  const { mutateAsync: updateService } = useMutation({
    mutationFn: putUpdateService,
  })

  async function handleOnSubmit(values: z.infer<typeof editServiceSchema>) {
    const editedService = {
      ...service,
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
            <Button variant="ghost">Cancelar</Button>
            <Button variant="destructive">Excluir</Button>
            <Button variant="accept" type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
