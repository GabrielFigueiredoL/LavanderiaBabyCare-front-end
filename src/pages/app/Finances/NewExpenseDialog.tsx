import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

import { getExpensesCategory } from '@/api/getExpensesCategory'
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
  name: z.string(),
  created_at: z.date(),
  category: z.string(),
  value: z.coerce.number(),
})

export function NewExpenseDialog() {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof newExpenseFormSchema>>({
    resolver: zodResolver(newExpenseFormSchema),
    defaultValues: {
      id: uuid(),
      name: undefined,
      created_at: new Date(),
      category: '',
      value: 0,
    },
  })

  const { data: expensesCategory } = useQuery({
    queryKey: ['expenses-category'],
    queryFn: getExpensesCategory,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar nova despesa</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form action="" className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <InputField id="name" label="Nome" field={field} />
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <InputField id="value" label="Valor" field={field} />
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
                        {field.value
                          ? expensesCategory?.find(
                              (expense) => expense.name === field.value,
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
                              form.setValue('category', expense.name)
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
