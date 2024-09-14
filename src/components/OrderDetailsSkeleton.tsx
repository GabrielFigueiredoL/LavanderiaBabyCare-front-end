import { Button } from './ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Skeleton } from './ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export function OrderDetailsSkeleton() {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex gap-3">
          Entrega: {<Skeleton className="h-5 w-7/12" />}
        </DialogTitle>
        <DialogDescription>Detalhes da entrega</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table className="text-xs md:text-sm">
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                {<Skeleton className="h-5 w-28" />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                {<Skeleton className="h-5 w-[200px]" />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                {<Skeleton className="h-5 w-[140px]" />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Bairro</TableCell>
              <TableCell className="flex justify-end">
                {<Skeleton className="h-5 w-32" />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Logradouro
              </TableCell>
              <TableCell className="flex justify-end">
                {<Skeleton className="h-5 w-40" />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Complemento
              </TableCell>
              <TableCell className="flex justify-end">
                {<Skeleton className="h-5 w-[140px]" />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="text-xs md:text-sm">
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor unitário</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 2 }).map((_, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    {<Skeleton className="h-5 w-[140px]" />}
                  </TableCell>
                  <TableCell>
                    {<Skeleton className="ml-auto h-5 w-3" />}
                  </TableCell>
                  <TableCell>
                    {<Skeleton className="ml-auto h-5 w-12" />}
                  </TableCell>
                  <TableCell>
                    {<Skeleton className="ml-auto h-5 w-12" />}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Valor total</TableCell>
              <TableCell colSpan={2}>
                {<Skeleton className="ml-auto h-5 w-20" />}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="flex justify-between">
          <Button className="w-2/5" variant="destructive" disabled>
            Excluir
          </Button>
          <Button className="w-2/5" disabled>
            Orçamento
          </Button>
        </div>
      </div>
    </>
  )
}
