'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

import { getProducts } from '@/api/productRequests/getProducts'
import { productProps } from '@/api/productRequests/product'
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
interface SelectProps {
  selectedProduct: productProps
  setSelectedProduct: Dispatch<SetStateAction<productProps>>
}

export function NewOrderCombobox({
  selectedProduct,
  setSelectedProduct,
}: SelectProps) {
  const [open, setOpen] = useState(false)

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  function handleAddProduct(item: string) {
    if (item === selectedProduct.name) {
      setSelectedProduct({
        id: '',
        name: '',
        price: 0,
        updatedAt: new Date(0),
      })
    }
    if (products) {
      setSelectedProduct(products.find((product) => product.name === item)!)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedProduct.name !== ''
            ? products?.find((item) => item.name === selectedProduct.name)?.name
            : 'Selecione um serviço...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-min p-0">
        <Command>
          <CommandInput placeholder="Busque um serviço..." />
          <CommandEmpty>Não foi encontrado nenhum serviço.</CommandEmpty>
          <CommandGroup>
            {products?.map((item) => (
              <CommandItem
                key={item.name}
                value={item.name}
                onSelect={(currentValue) => {
                  handleAddProduct(currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedProduct.name === item.name
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
