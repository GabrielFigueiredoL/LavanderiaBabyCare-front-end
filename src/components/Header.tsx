import { Bolt, HandCoins, Home, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'

import logo from '../assets/logo.svg'
import { NavLink } from './Nav-Link'
import { ThemeToggle } from './theme/ThemeToggle'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="items-center justify-between border-b px-7 py-4 md:flex md:px-10">
        <div className="flex items-center gap-4">
          <img src={logo} alt="" width={110} />
          <Separator orientation="vertical" className="h-6" />
          <ThemeToggle />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              type="button"
              size="icon"
              className="absolute right-8 top-4 md:hidden"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav>
              <NavLink to="/" onClick={() => setOpen(false)}>
                <Home className="h-4 w-4" />
                Início
              </NavLink>
              <NavLink to="/deliveries" onClick={() => setOpen(false)}>
                <LogOut className="h-4 w-4" />
                Entregas
              </NavLink>
              <NavLink to="/finances" onClick={() => setOpen(false)}>
                <HandCoins className="h-4 w-4" />
                Financeiro
              </NavLink>
              <NavLink to="/configs" onClick={() => setOpen(false)}>
                <Bolt className="h-4 w-4" />
                Configurações
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <nav className=" hidden items-center gap-4 text-lg md:flex">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/deliveries">
            <LogOut className="h-4 w-4" />
            Entregas
          </NavLink>
          <NavLink to="/finances">
            <HandCoins className="h-4 w-4" />
            Financeiro
          </NavLink>
          <NavLink to="/configs">
            <Bolt className="h-4 w-4" />
            Configurações
          </NavLink>
        </nav>
      </div>
    </div>
  )
}
