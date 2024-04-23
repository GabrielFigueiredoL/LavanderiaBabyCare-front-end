'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { z } from 'zod'

import { getServices } from '@/api/getServices'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const ServiceProps = z.object({
  name: z.string(),
  price: z.number(),
})

export type ServicePropsType = z.infer<typeof ServiceProps>

interface SelectProps {
  selectedService: ServicePropsType
  setSelectedService: Dispatch<SetStateAction<ServicePropsType>>
}

export function NewDeliveryCombobox({
  selectedService,
  setSelectedService,
}: SelectProps) {
  const [open, setOpen] = useState(false)

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedService.name !== ''
            ? services?.find((item) => item.name === selectedService.name)?.name
            : 'Selecione um serviço...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-min p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {services?.map((item) => (
              <CommandItem
                key={item.name}
                value={item.name}
                onSelect={(currentValue) => {
                  setSelectedService(
                    currentValue === selectedService.name
                      ? { name: '', price: 0 }
                      : { name: currentValue, price: item.price },
                  )
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedService.name === item.name
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
