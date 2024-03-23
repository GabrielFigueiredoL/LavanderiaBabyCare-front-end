import { Bolt, HandCoins, Home, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

import logo from '../assets/logo.svg'
import { NavLink } from './Nav-Link'
import { ThemeToggle } from './theme/ThemeToggle'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

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

        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-4 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </Button>

        <nav
          className={`absolute left-0 z-20 w-screen bg-background py-2 pl-9 text-lg md:static md:z-auto md:flex md:w-auto md:items-center md:gap-4 md:py-0 md:pl-0 ${open ? 'top-20' : '-top-60'}`}
        >
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
