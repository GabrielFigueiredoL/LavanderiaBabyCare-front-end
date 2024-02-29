import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from './ui/button'

export function ServiceDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 1827fy2827d6h</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">Gabriel</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                (61) 99999-9999
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Bairro</TableCell>
              <TableCell className="flex justify-end">Sudoeste</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Logradouro
              </TableCell>
              <TableCell className="flex justify-end">
                SQSW 100 Bloco F
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Complemento
              </TableCell>
              <TableCell className="flex justify-end">
                Apartamento 202
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor unitário</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Carrinho tradicional</TableCell>
              <TableCell className="text-right">R$ 75,00</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 150,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Moisés</TableCell>
              <TableCell className="text-right">R$ 60,00</TableCell>
              <TableCell className="text-right">3</TableCell>
              <TableCell className="text-right">R$ 180,00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Valor total</TableCell>
              <TableCell colSpan={3} className="text-right">
                R$ 240,00
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="flex justify-between">
          <Button className="w-2/5" variant="destructive">
            Excluir
          </Button>
          <Button className="w-2/5">Orçamento</Button>
        </div>
      </div>
    </DialogContent>
  )
}
