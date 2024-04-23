import { z } from 'zod'

export const newDeliveryFormValidationSchema = z.object({
  name: z.string().min(1, 'Informe o nome do cliente'),
  phone: z.string().min(1, 'Informe o telefone do cliente'),
  withdrawalDate: z.date(),
  deliveryDate: z
    .date()
    .min(new Date(), 'Informe uma data maior ou igual a hoje'),
  cep: z.string().max(8, 'O cep deve possuir apenas 8 números'),
  adress: z.string().min(1, 'Informe o logradouro'),
  district: z.string().min(1, 'Informe o bairro'),
  number: z.string(),
  complement: z.string(),
  freightage: z.coerce.number().nonnegative(),
  discount: z.coerce.number().nonnegative(),
  id: z.string(),
})
