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

export function NewProductDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar novo produto</DialogTitle>
        <DialogDescription>
          Adicione as informações do novo serviço
        </DialogDescription>
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
            <Label className="text-right" htmlFor="value">
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

        <DialogFooter className="gap-2">
          <Button variant="ghost">Cancelar</Button>
          <Button variant="accept" type="submit">
            Adicionar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
