// interface Props { }

import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { ArrowRight, Search } from 'lucide-react'

import { ServiceDetails } from '@/components/ServiceDetails'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function ServicesCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="mr-2 h-3 w-3" />
                <span>Mais detalhes</span>
              </Button>
            </DialogTrigger>

            <ServiceDetails />
          </Dialog>
          <Button variant="outline" size="xs">
            <ArrowRight className="mr-2 h-3 w-3" />
            Retirado
          </Button>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    A retirar
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">Gabriel</TableCell>
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
      </CardContent>
    </Card>
  )
}
