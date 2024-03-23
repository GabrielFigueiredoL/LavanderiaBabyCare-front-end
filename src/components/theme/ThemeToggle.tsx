import { Moon, Sun } from 'lucide-react'

import { Button } from '../ui/button'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  function themeToggle() {
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    }
  }

  return (
    <Button variant="ghost" onClick={themeToggle}>
      <span className="sr-only">
        Trocar para {theme === 'dark' ? 'modo claro' : 'modo escuro'}
      </span>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
