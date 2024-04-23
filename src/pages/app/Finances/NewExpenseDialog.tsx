import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { getExpensesCategory } from '@/api/getExpensesCategory'
import { postNewExpense } from '@/api/postNewExpense'
import { InputField } from '@/components/InputField'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const newExpenseFormSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Informe uma descrição'),
  created_at: z.date(),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .required(),
  value: z.coerce.number().min(1, 'Informe um valor'),
})

export function NewExpenseDialog() {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof newExpenseFormSchema>>({
    resolver: zodResolver(newExpenseFormSchema),
    defaultValues: {
      id: uuid(),
      description: '',
      created_at: new Date(),
      category: {},
      value: 0,
    },
  })

  const { data: expensesCategory } = useQuery({
    queryKey: ['expenses-category'],
    queryFn: getExpensesCategory,
  })

  const { mutateAsync: addNewExpense } = useMutation({
    mutationFn: postNewExpense,
  })

  async function handleOnSubmit(values: z.infer<typeof newExpenseFormSchema>) {
    const newExpense = {
      ...values,
      value: values.value * 100,
    }
    try {
      await addNewExpense(newExpense)
      toast.success('Despesa adicionada com sucesso.')
    } catch (error) {
      console.log(error)
      toast.error('Não foi possível adicionar nova despesa.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar nova despesa</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <InputField id="description" label="Descrição" field={field} />
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Despesa</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {field.value.name
                          ? expensesCategory?.find(
                              (expense) => expense.name === field.value.name,
                            )?.name
                          : 'Selecione uma despesa...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Busque uma despesa..." />
                      <CommandEmpty>
                        Não foi possível encontrar as categorias de despesa.
                      </CommandEmpty>
                      <CommandGroup>
                        {expensesCategory?.map((expense) => (
                          <CommandItem
                            key={expense.id}
                            value={expense.name}
                            onSelect={() => {
                              form.setValue('category', expense)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                expense.name === field.name
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {expense.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <InputField id="value" label="Valor" field={field} />
            )}
          />
          <DialogFooter>
            <Button variant="accept" type="submit">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
