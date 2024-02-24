import { Bolt, HandCoins, Home, LogIn, LogOut } from 'lucide-react'

import logo from '../assets/logo.svg'
import { NavLink } from './Nav-Link'
import { ThemeToggle } from './theme/ThemeToggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img src={logo} alt="" width={110} />
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/delivery">
            <LogOut className="h-4 w-4" />
            Entregas
          </NavLink>
          <NavLink to="/withdraw">
            <LogIn className="h-4 w-4" />
            Retiradas
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
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
