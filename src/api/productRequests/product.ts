export type productProps = {
  id: string
  price: number
  name: string
  updatedAt: Date
}

export type selectedProduct = {
  product: productProps
  amount: number
  price: number
}
