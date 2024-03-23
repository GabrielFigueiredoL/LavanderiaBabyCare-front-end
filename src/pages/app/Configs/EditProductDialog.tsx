// interface Props { }

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function EditProductDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar produto</DialogTitle>
        <DialogDescription>Edite as informações do serviço</DialogDescription>
      </DialogHeader>

      <form action="">
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-3">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-3">
            <Label className="text-right" htmlFor="email">
              Valor
            </Label>
            <Input
              id="value"
              className="col-span-3"
              type="number"
              min={0}
              required
            />
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button variant="ghost">Cancelar</Button>
          <Button variant="destructive">Excluir</Button>
          <Button variant="accept" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
