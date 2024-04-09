import type { InputHTMLAttributes } from 'react'

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any
}

export function InputField({ id, label, field, ...rest }: InputGroupProps) {
  return (
    <FormItem className="w-full">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl>
        <Input className="mt-1" id={id} {...field} {...rest} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
