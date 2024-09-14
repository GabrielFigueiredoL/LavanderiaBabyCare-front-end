import { z } from 'zod'

export const newDeliveryFormValidationSchema = z.object({
  clientName: z.string().min(1, 'Informe o nome do cliente'),
  clientPhone: z
    .string()
    .min(1, 'Informe o telefone do cliente')
    .length(
      11,
      'O número precisa possuir 11 digitos, sendo 2 do ddd e estar no formato 61999999999',
    ),
  pickupDate: z.date(),
  deliveryDate: z
    .date()
    .min(new Date(), 'Informe uma data maior ou igual a hoje'),
  cep: z.string().max(8, 'O cep deve possuir apenas 8 números'),
  address: z.string().min(1, 'Informe o logradouro'),
  district: z.string().min(1, 'Informe o bairro'),
  number: z.string(),
  complement: z.string(),
  shipping: z.coerce.number().nonnegative(),
  discount: z.coerce.number().nonnegative(),
  id: z.string(),
})
