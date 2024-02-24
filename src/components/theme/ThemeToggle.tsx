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
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
