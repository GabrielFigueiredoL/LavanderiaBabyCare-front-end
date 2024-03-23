// interface Props { }

import { Filter, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function HomeFilters() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Filter />
          <span className="ml-2 hidden md:block">Filtros</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-2">
          <Input placeholder="Local" className="h-8" />
          <Input placeholder="Nome do cliente" className="h-8" />
          <Select defaultValue="all">
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="toBeWithdrawn">A retirar</SelectItem>
              <SelectItem value="processing">Em processo</SelectItem>
              <SelectItem value="tobeDelivered">A entregar</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
              <SelectItem value="toBePaid">A pagar</SelectItem>
              <SelectItem value="finished">Finalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" size="xs" type="submit">
            <Search className="mr-2 h-4 w-4" />
            Filtrar resultados
          </Button>
          <Button variant="outline" size="xs" type="button">
            <X className="mr-2 h-4 w-4" />
            Remover filtros
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
